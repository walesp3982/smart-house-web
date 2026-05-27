export function getErrorMessage(
  detail: string | { msg: string }[] | undefined,
): string {
  if (!detail) return "Error inesperado";
  if (typeof detail === "string") return detail;
  return detail.map((e) => e.msg).join(", ");
}
