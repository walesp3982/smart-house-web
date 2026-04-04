import { useState } from "react";
import { loginUser } from "@/lib/api/services/auth.service";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginSchema = z.object({
  email: z.email("Dirección de correo inválida"),
  password: z.string().min(1, "Se requiere este campo"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (value: LoginFormValues) => {
    setIsLoading(true);
    try {
      const data = await loginUser(value.email, value.password);
      toast.success("Sesión iniciada correctamente");
      return data;
    } catch {
      toast.error("Credenciales inválidas", {
        description: "Verifica tu correo y contraseña",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onSubmit };
}
