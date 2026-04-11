import { redirect } from "next/navigation";

const statusValues = ["success", "expired", "invalid"];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;

  if (!status || !statusValues.includes(status)) {
    redirect("/");
  }

  if (status === "success") {
    redirect("/dashboard");
  }

  return (
  <div
    style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div style={{ textAlign: "center" }}>
      {status === "expired" && (
        <>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "red" }}>
            ⏰ Enlace expirado
          </h1>
          <p style={{ color: "gray" }}>
            El enlace de verificación ya no es válido.
          </p>
        </>
      )}

      {status === "invalid" && (
        <>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "red" }}>
            ❌ Token inválido
          </h1>
          <p style={{ color: "gray" }}>
            El enlace de verificación no es correcto.
          </p>
        </>
      )}
    </div>
  </div>
);
}