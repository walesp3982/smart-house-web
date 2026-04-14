import { useEffect, useRef, useState } from "react";
type Status = "connecting" | "open" | "closed" | "error"

export function buildWebsocketURL(uuid: string, ticket: string) {
    const websocketURLBasic = process.env.NEXT_WEB_SOCKET_URL ?? "ws://localhost:8000"
    return `${websocketURLBasic}/${uuid}?ticket=${ticket}`
}

export function useStateDevice(url: string) {
    const ws = useRef<WebSocket | null>(null)

    const [status, setStatus] = useState<Status>("connecting")
    const [lastMessage, setLastMessage] = useState<string | null>(null)


    useEffect(() => {
        ws.current = new WebSocket(url)

        ws.current.onopen = () => setStatus("open")
        ws.current.onclose = () => setStatus("closed");
        ws.current.onerror = () => setStatus("error");
        ws.current.onmessage = (e) => setLastMessage(e.data);

        return () => {
            ws.current?.close();
        }
    }, [url])

    return { status, lastMessage }

}