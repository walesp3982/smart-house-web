import { useState, KeyboardEvent } from "react";
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import SendIcon from "@mui/icons-material/Send";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { get_transcription } from "@/lib/api/services/transcription";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const { isRecording, start, stop } = useAudioRecorder(async (blob) => {
    const { data, error } = await get_transcription(blob);
    if (error || !data) return;
    onSend(data.transcription);
  });

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleMic = () => {
    if (isRecording) {
      stop();
    } else {
      start();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "flex-end",
        p: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Escribe un comando..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        disabled={disabled}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      <Tooltip title={isRecording ? "Detener" : "Grabar audio"}>
        <IconButton
          onClick={toggleMic}
          color={isRecording ? "error" : "default"}
          sx={{
            border: "1px solid",
            borderColor: isRecording ? "error.main" : "divider",
            borderRadius: 2,
          }}
        >
          {isRecording ? (
            <MicOffIcon fontSize="small" />
          ) : (
            <MicIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title="Enviar">
        <span>
          <IconButton
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            color="primary"
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 2,
              "&.Mui-disabled": { borderColor: "divider" },
            }}
          >
            {disabled ? (
              <CircularProgress size={18} />
            ) : (
              <SendIcon fontSize="small" />
            )}
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
