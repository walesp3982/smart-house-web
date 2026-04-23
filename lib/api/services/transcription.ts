export async function get_transcription(blob: Blob) {
  const form = new FormData();
  form.append("file", new File([blob], "audio.webm", { type: "audio/webm" }));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/voice/transcribe`,
    {
      method: "POST",
      body: form,
      credentials: "include",
    },
  );

  if (!res.ok) return { data: null, error: await res.json() };

  const data = await res.json();
  return { data, error: null };
}
