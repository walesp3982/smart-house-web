import { useEffect, useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { useSSEStream } from "@/hooks/useSSEStream";

export function ChatPanel() {
  const { messages, isStreaming, sendMessage } = useSSEStream("/api/chat/ask");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90%",
        width: "90%",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#0F1117",
      }}
      elevation={0}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.25,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: isStreaming ? "warning.main" : "success.main",
            transition: "background-color 0.3s",
          }}
        />
        <Typography variant="subtitle2" fontWeight={600}>
          Smart House
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ ml: "auto" }}
        >
          {isStreaming ? "Respondiendo..." : "Listo"}
        </Typography>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            streaming={msg.streaming}
          />
        ))}
        <div ref={bottomRef} />
      </Box>

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={isStreaming} />
    </Paper>
  );
}
