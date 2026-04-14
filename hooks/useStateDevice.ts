import { getTicketSocket } from "@/lib/api/services/websocket.service";
import { useCallback, useEffect, useRef } from "react";
import { useInstalledDevicesStore } from "@/store/installed-devices-store";
export function buildWebsocketURL(uuid: string, ticket: string) {
  const websocketURLBasic = process.env.NEXT_WEB_SOCKET_URL ?? "ws://localhost:8000"
  return `${websocketURLBasic}/${uuid}?ticket=${ticket}`
}

async function fetchTicket(): Promise<string> {
  const { data } = await getTicketSocket()
  if (!data) throw new Error("No se pudo obtener el ticket")
  return data.ticket
}
export function useStateDevice(uuid: string) {
  const updateDevice = useInstalledDevicesStore((s) => s.updateDeviceState)
  const ws = useRef<WebSocket | null>(null)
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const connectRef = useRef<() => Promise<void>>(async () => { })

  const connect = useCallback(async () => {
    try {
      updateDevice(uuid, { status: "fetching-ticket" });
      const ticket = await fetchTicket();

      const url = buildWebsocketURL(uuid, ticket);
      updateDevice(uuid, { status: "connecting" });

      ws.current = new WebSocket(url);

      ws.current.onopen = () => updateDevice(uuid, { status: "open" });

      ws.current.onmessage = (e) => updateDevice(uuid, { lastMessage: e.data });

      ws.current.onerror = () => updateDevice(uuid, { status: "error" });

      ws.current.onclose = () => {
        updateDevice(uuid, { status: "closed" })
        // ticket ya fue consumido, necesitamos uno nuevo
        reconnectTimer.current = setTimeout(() => connectRef.current(), 3000);
      };
    } catch {
      updateDevice(uuid, { status: "error" });
      reconnectTimer.current = setTimeout(() => connectRef.current(), 5000); // reintenta si falla el POST
    }
  }, [uuid, updateDevice]);

  useEffect(() => {
    connectRef.current = connect;
  }, [connect])
  useEffect(() => {
    const timer = setTimeout(() => connect(), 0);
    return () => {
      clearTimeout(timer)
      clearTimeout(reconnectTimer.current);
      ws.current?.close();
    };
  }, [connect]);




}