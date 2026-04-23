"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
  Alert,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";
import {
  Send as SendIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { transcribeAudioAPI } from "@/actions/chat.actions";
import styles from "./Chat.module.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: text }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error en la consulta del chat");
      }

      if (!response.body) {
        throw new Error("No response body from API");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("event: done")) {
            break;
          }
          if (line.startsWith("event: error")) {
            const errorMatch = line.match(/data: (.+)/);
            if (errorMatch) {
              throw new Error(errorMatch[1]);
            }
          }
          if (line.startsWith("data: ")) {
            const token = line.slice(6);
            assistantMessage.content += token;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessage.id ? { ...assistantMessage } : msg
              )
            );
          }
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      console.error("Error sending message:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorder.onstart = () => {
        setIsRecording(true);
        setError(null);
      };

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        stream.getTracks().forEach((track) => track.stop());

        // Transcribir audio
        await transcribeAndSend(audioBlob);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al acceder al micrófono";
      setError(errorMessage);
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const transcribeAndSend = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const transcribedText = await transcribeAudioAPI(audioBlob);

      if (transcribedText) {
        await handleSendMessage(transcribedText);
      } else {
        setError("No se pudo transcribir el audio");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al transcribir";
      setError(errorMessage);
      console.error("Error transcribing:", err);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box className={styles.chatContainer}>
      <Paper className={styles.header} elevation={0} sx={{ backgroundColor: "transparent" }}>
        <Typography variant="h6" fontWeight={600}>
          Asistente Inteligente
        </Typography>
        <Typography variant="caption" color="textSecondary" sx={{ color: "rgba(255, 255, 255, 0.7) !important" }}>
          Haz preguntas sobre tus dispositivos o controla tu hogar
        </Typography>
      </Paper>

      <Box className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <Box className={styles.emptyState}>
            <Typography variant="body2" color="textSecondary" align="center">
              Inicia una conversación. Puedes preguntar sobre tus dispositivos,
              hacer órdenes de control, o simplemente conversar.
            </Typography>
          </Box>
        ) : (
          messages.map((message) => (
            <Box
              key={message.id}
              className={`${styles.message} ${styles[message.role]}`}
            >
              <Avatar
                className={styles.avatar}
                sx={{
                  bgcolor: "#667eea",
                }}
              >
                {message.role === "user" ? "TÚ" : "IA"}
              </Avatar>
              <Box className={styles.messageContent}>
                <Typography
                  variant="body2"
                  className={styles.messageText}
                  sx={{
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {message.content}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          ))
        )}
        {isLoading && (
          <Box className={`${styles.message} ${styles.assistant}`}>
            <Avatar className={styles.avatar} sx={{ bgcolor: "#667eea" }}>
              IA
            </Avatar>
            <Box className={styles.messageContent}>
              <CircularProgress size={20} sx={{ color: "#667eea" }} />
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{
            mx: 2,
            mb: 2,
            backgroundColor: "#3a1a1a",
            color: "#ff6b6b",
            "& .MuiAlert-icon": {
              color: "#ff6b6b",
            },
          }}
        >
          {error}
        </Alert>
      )}

      <Box className={styles.inputContainer}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Escribe tu pregunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || isRecording || isTranscribing}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "#2a2a2a",
              color: "#e0e0e0",
              "& fieldset": {
                borderColor: "#3a3a3a",
              },
              "&:hover fieldset": {
                borderColor: "#667eea",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: "#e0e0e0",
              "&::placeholder": {
                color: "#999",
                opacity: 1,
              },
            },
          }}
        />

        <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
          <Tooltip title={isRecording ? "Detener grabación" : "Grabar mensaje"}>
            <IconButton
              size="small"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading || isTranscribing}
              sx={{
                color: isRecording ? "#ff6b6b" : "#667eea",
                "&:hover": {
                  backgroundColor: "rgba(102, 126, 234, 0.1)",
                },
              }}
            >
              {isRecording ? <MicOffIcon /> : <MicIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Enviar mensaje">
            <span>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim() || isRecording}
                size="small"
                sx={{
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  textTransform: "none",
                  "&:disabled": {
                    background: "#444",
                  },
                }}
              >
                Enviar
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );
}
