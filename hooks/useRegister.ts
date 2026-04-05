import { registerUser } from "@/lib/api/services/auth.service";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/utils/error";
export const registerSchema = z.object({
  name: z.string().min(1, "Campo requerido"),
  email: z.email("Dirección de email inválida"),
  password: z.string().min(8, "Requerida contraseña de 8 caracteres"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await registerUser(
        formData.email,
        formData.name,
        formData.password,
      );
      if (error) {
        toast.error(getErrorMessage(error.detail));
        return;
      }
      if (data) {
        if (data.is_verified) {
          // TODO: Crear un lugar de espera para la verificación por email
          router.push("/");
        }
        router.push("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onSubmit };
}
