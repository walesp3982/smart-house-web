import { redirect } from "next/navigation";

const statusValues = ["success", "expired", "invalid"];

export default function Page({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = searchParams.status;

  if (statusValues.findIndex((state) => state == status) === -1) {
    redirect("/");
  }
  if (status === "success") {
    // opcional: redirigir directo
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {status === "expired" && <p>El enlace ha expirado</p>}
      {status === "invalid" && <p>Token inválido</p>}
    </div>
  );
}
