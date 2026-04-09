"use server";

import { apiClient } from "@/lib/api/client";

interface TranscribeAudio {
  file: string;
}
export async function transcribeAudio(body: TranscribeAudio) {
  return await apiClient.POST("/voice/transcribe", {
    body,
  });
}
