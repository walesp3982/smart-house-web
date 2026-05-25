import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

async function getBackendErrorMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const data = await response.json();

      if (typeof data?.detail === "string") {
        return data.detail;
      }

      if (Array.isArray(data?.detail)) {
        const detail = data.detail
          .map((item: { msg?: string }) => item?.msg)
          .filter(Boolean)
          .join(", ");

        if (detail) {
          return detail;
        }
      }

      if (typeof data?.message === "string") {
        return data.message;
      }
    } catch {
      // Se vuelve al fallback de texto/estado si el JSON no es parseable
    }
  }

  const fallbackText = await response.text();

  if (fallbackText) {
    return fallbackText;
  }

  return `Error ${response.status}: ${response.statusText || "Solicitud fallida"}`;
}

export function useSSEStream(endpoint: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(
    async (userInput: string) => {
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: userInput,
      };

      let aiId = crypto.randomUUID();
      const aiMsg: Message = {
        id: aiId,
        role: "assistant",
        content: "",
        streaming: true,
      };

      setMessages((prev) => [...prev, userMsg, aiMsg]);
      setIsStreaming(true);

      const finalizeStreaming = () => {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === aiId ? { ...message, streaming: false } : message,
          ),
        );
        setIsStreaming(false);
      };

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userInput }),
        });

        if (!response.ok) {
          const errorMessage = await getBackendErrorMessage(response);
          toast.error(errorMessage);
          finalizeStreaming();
          return;
        }

        if (!response.body) {
          toast.error("No se pudo leer la respuesta del servidor");
          finalizeStreaming();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (line.startsWith("event: done")) {
              finalizeStreaming();
              return;
            }

            if (line.startsWith("data: ")) {
              const chunk = line.slice(6);
              const clean = chunk.replace(/^"|"$/g, "");

              if (!clean || clean === "null") continue;

              if (clean.includes("[NEXT_BUBBLE]")) {
                const closingId = aiId;
                setMessages((prev) =>
                  prev.map((message) =>
                    message.id === closingId
                      ? { ...message, streaming: false }
                      : message,
                  ),
                );

                aiId = crypto.randomUUID();
                setMessages((prev) => [
                  ...prev,
                  { id: aiId, role: "assistant", content: "", streaming: true },
                ]);
                continue;
              }

              setMessages((prev) =>
                prev.map((message) =>
                  message.id === aiId
                    ? { ...message, content: message.content + clean }
                    : message,
                ),
              );
            }
          }
        }

        finalizeStreaming();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Error al conectar con el servidor";

        toast.error(message || "Error al conectar con el servidor");
        finalizeStreaming();
      }
    },
    [endpoint],
  );

  return { messages, isStreaming, sendMessage };
}
