import { Box, Avatar, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

const markdownComponents: Components = {
  p: ({ children }) => (
    <Typography variant="body2" sx={{ m: 0, lineHeight: 1.6 }}>
      {children}
    </Typography>
  ),
  strong: ({ children }) => (
    <Box component="strong" sx={{ fontWeight: 600 }}>
      {children}
    </Box>
  ),
  ul: ({ children }) => (
    <Box component="ul" sx={{ pl: 2, my: 0.5 }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body2" sx={{ lineHeight: 1.6 }}>
      {children}
    </Typography>
  ),
  code: ({ children }) => (
    <Box
      component="code"
      sx={{
        fontFamily: "monospace",
        fontSize: "0.78rem",
        bgcolor: "action.hover",
        px: 0.5,
        borderRadius: 0.5,
      }}
    >
      {children}
    </Box>
  ),
};

export function ChatBubble({ role, content, streaming }: ChatBubbleProps) {
  const isUser = role === "user";

  const normalized = content
    .replace(/\*\*/g, "**") // bold ya está bien
    .replace(/([.!?])\s*-\s*/g, "$1\n\n- ") // listas después de punto
    .replace(/:\s*-\s*/g, ":\n\n- ") // listas después de dos puntos
    .replace(/\n{3,}/g, "\n\n"); // máximo doble salto
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "flex-end",
        flexDirection: isUser ? "row-reverse" : "row",
      }}
    >
      <Avatar
        sx={{
          width: 28,
          height: 28,
          fontSize: "0.65rem",
          fontWeight: 600,
          bgcolor: isUser ? "primary.light" : "grey.200",
          color: isUser ? "primary.contrastText" : "text.secondary",
          flexShrink: 0,
        }}
      >
        {isUser ? "TÚ" : "IA"}
      </Avatar>

      <Box
        sx={{
          maxWidth: "72%",
          px: 1.75,
          py: 1.25,
          borderRadius: 3,
          ...(isUser
            ? {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                borderBottomRightRadius: 4,
              }
            : {
                bgcolor: "#4615b2",
                color: "common.white",
                borderBottomLeftRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }),
          "& > * + *": { mt: 0.5 },
        }}
      >
        <ReactMarkdown components={markdownComponents}>
          {normalized}
        </ReactMarkdown>

        {streaming && (
          <Box
            component="span"
            sx={{
              display: "inline-block",
              width: 2,
              height: "0.9em",
              bgcolor: "currentColor",
              ml: 0.25,
              verticalAlign: "middle",
              opacity: 0.7,
              "@keyframes blink": {
                "0%, 100%": { opacity: 0.7 },
                "50%": { opacity: 0 },
              },
              animation: "blink 0.8s infinite",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
