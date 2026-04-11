import VerifyWatcher from "./watcher";

export default function Page() {
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
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          📧 Verifica tu correo
        </h1>

        <p style={{ color: "gray" }}>
          Revisa tu bandeja de entrada y sigue el enlace enviado.
        </p>

        <VerifyWatcher />
      </div>
    </div>
  );
}