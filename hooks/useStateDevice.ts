import { getTicketSocket } from "@/lib/api/services/websocket.service";
import { useCallback, useEffect, useRef } from "react";
import { useInstalledDevicesStore } from "@/store/installed-devices-store";

export function buildWebsocketURL(installed_device_id: number, ticket: string) {
  console.log("ENV:", process.env);
  console.log("WS:", process.env.NEXT_PUBLIC_WEB_SOCKET_URL);
  const websocketURLBasic =
    process.env.NEXT_PUBLIC_WEB_SOCKET_URL ?? "ws://localhost:8000";
  return `${websocketURLBasic}/ws/${installed_device_id}?ticket=${ticket}`;
}

async function fetchTicket(): Promise<string> {
  const { data } = await getTicketSocket();
  if (!data) throw new Error("No se pudo obtener el ticket");
  return data.ticket;
}
export function useStateDevice(installed_device_id: number) {
  const updateDevice = useInstalledDevicesStore((s) => s.updateDeviceState);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const connectRef = useRef<() => Promise<void>>(async () => {});

  const connect = useCallback(async () => {
    try {
      updateDevice(installed_device_id, { status: "fetching-ticket" });
      const ticket = await fetchTicket();

      const url = buildWebsocketURL(installed_device_id, ticket);
      updateDevice(installed_device_id, { status: "connecting" });

      ws.current = new WebSocket(url);

      ws.current.onopen = () =>
        updateDevice(installed_device_id, { status: "open" });

      ws.current.onmessage = (e) =>
        updateDevice(installed_device_id, { lastMessage: e.data });

      ws.current.onerror = () =>
        updateDevice(installed_device_id, { status: "error" });

      ws.current.onclose = () => {
        updateDevice(installed_device_id, { status: "closed" });
        // ticket ya fue consumido, necesitamos uno nuevo
        reconnectTimer.current = setTimeout(() => connectRef.current(), 3000);
      };
    } catch {
      updateDevice(installed_device_id, { status: "error" });
      reconnectTimer.current = setTimeout(() => connectRef.current(), 5000); // reintenta si falla el POST
    }
  }, [installed_device_id, updateDevice]);

  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);
  useEffect(() => {
    const timer = setTimeout(() => connect(), 0);
    return () => {
      clearTimeout(timer);
      clearTimeout(reconnectTimer.current);
      ws.current?.close();
    };
  }, [connect]);
}
