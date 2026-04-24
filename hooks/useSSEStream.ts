import { useState, useCallback } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
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

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput }),
      });

      const reader = response.body!.getReader();
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
            setMessages((prev) =>
              prev.map((m) => (m.id === aiId ? { ...m, streaming: false } : m)),
            );
            setIsStreaming(false);
            return;
          }

          if (line.startsWith("data: ")) {
            const chunk = line.slice(6);
            const clean = chunk.replace(/^"|"$/g, "");

            if (!clean || clean === "null") continue;

            // Nueva burbuja
            if (clean.includes("[NEXT_BUBBLE]")) {
              const closingId = aiId;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === closingId ? { ...m, streaming: false } : m,
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
              prev.map((m) =>
                m.id === aiId ? { ...m, content: m.content + clean } : m,
              ),
            );
          }
        }
      }

      setIsStreaming(false);
    },
    [endpoint],
  );

  return { messages, isStreaming, sendMessage };
}
