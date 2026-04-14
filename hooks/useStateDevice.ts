import { getTicketSocket } from "@/lib/api/services/websocket.service";
import { useCallback, useEffect, useRef, useState } from "react";
type Status = "connecting" | "open" | "closed" | "error" | "idle" | "fetching-ticket"

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
  const ws = useRef<WebSocket | null>(null)
  const reconnectTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const connectRef = useRef<() => Promise<void>>(async () => { })
  const [status, setStatus] = useState<Status>("connecting")
  const [lastMessage, setLastMessage] = useState<string | null>(null)


  const connect = useCallback(async () => {
    try {
      setStatus("fetching-ticket");
      const ticket = await fetchTicket();

      const url = buildWebsocketURL(uuid, ticket);
      setStatus("connecting");

      ws.current = new WebSocket(url);

      ws.current.onopen = () => setStatus("open");

      ws.current.onmessage = (e) => setLastMessage(e.data);

      ws.current.onerror = () => setStatus("error");

      ws.current.onclose = () => {
        setStatus("closed");
        // ticket ya fue consumido, necesitamos uno nuevo
        reconnectTimer.current = setTimeout(() => connectRef.current(), 3000);
      };
    } catch {
      setStatus("error");
      reconnectTimer.current = setTimeout(() => connectRef.current(), 5000); // reintenta si falla el POST
    }
  }, [uuid]);

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



  return { status, lastMessage }

}