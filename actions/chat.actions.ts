"use server";

import { apiClient } from "@/lib/api/client";

interface AskRequest {
  question: string;
}

/**
 * Envía una pregunta al servicio de chat con Ollama
 * Retorna un stream de eventos SSE
 */
export async function askChatAPI(request: AskRequest): Promise<Response> {
  const { data, error, response } = await apiClient.POST("/ask", {
    body: { question: request.question },
    parseAs: "stream",
  });

  if (error) {
    throw new Error(
      typeof error === "string"
        ? error
        : JSON.stringify(error) || "Error al conectar con el chat"
    );
  }

  if (!response) {
    throw new Error("No se recibió respuesta del chat");
  }

  return response;
}

/**
 * Transcribe un archivo de audio a texto
 */
export async function transcribeAudioAPI(audioBlob: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    const response = await apiClient.POST("/voice/transcribe", {
      body: formData as any,
    });

    if (response.error) {
      throw new Error(
        (response.error as any).detail || "Error al transcribir audio"
      );
    }

    const data = response.data as any;
    return data.text || data.transcription || "";
  } catch (error) {
    throw new Error(
      `Error al transcribir audio: ${error instanceof Error ? error.message : "Error desconocido"}`
    );
  }
}
