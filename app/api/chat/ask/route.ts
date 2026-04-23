import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = body?.question;

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Pregunta inválida" }, { status: 400 });
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
    const cookieStore = cookies();
    const token = await cookieStore.get("access_token")?.value;

    const backendResponse = await fetch(`${apiUrl}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(request.headers.get("cookie")
          ? { Cookie: request.headers.get("cookie")! }
          : {}),
      },
      body: JSON.stringify({ question }),
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text().catch(() => "Error en backend");
      return NextResponse.json(
        { error: errorText || "Error al consultar el chat" },
        { status: backendResponse.status }
      );
    }

    if (!backendResponse.body) {
      return NextResponse.json(
        { error: "No se recibió flujo de respuesta del chat" },
        { status: 500 }
      );
    }

    const headers = new Headers(backendResponse.headers);
    headers.set("Content-Type", "text/event-stream");
    headers.set("Cache-Control", "no-cache");
    headers.set("X-Accel-Buffering", "no");
    headers.set("Connection", "keep-alive");

    return new Response(backendResponse.body, {
      status: backendResponse.status,
      headers,
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "Error interno del servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
