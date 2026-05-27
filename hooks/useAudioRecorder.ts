// hooks/useAudioRecorder.ts
import { useState, useRef } from "react";

export function useAudioRecorder(onAudio: (blob: Blob) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];

    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      onAudio(blob);
      stream.getTracks().forEach((t) => t.stop());
    };

    recorder.start();
    mediaRef.current = recorder;
    setIsRecording(true);
  };

  const stop = () => {
    mediaRef.current?.stop();
    setIsRecording(false);
  };

  return { isRecording, start, stop };
}
