import { useState } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { registerInstalledDevice } from "@/lib/api/services";
import { getErrorMessage } from "@/lib/api/utils/error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerDeviceSchema = z.object({
  name: z.string().min(1, "Tiene que colocar un nombre"),
  uuid: z.uuid().min(1, "Coloca el uuid de dispositivo"),
  code_verificación: z.string().min(1, "Coloca el código de verificación"),
});

type RegisterDeviceValues = z.infer<typeof registerDeviceSchema>;

export function useRegisterDevice() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterDeviceValues>({
    defaultValues: { code_verificación: "", name: "", uuid: "" },
    resolver: zodResolver(registerDeviceSchema),
  });
  const onSubmit = async (formData: RegisterDeviceValues) => {
    setIsLoading(true);
    try {
      const { error } = await registerInstalledDevice({
        name: formData.name,
        code_verification: formData.code_verificación,
        uuid: formData.uuid,
      });

      if (error) {
        toast.error(getErrorMessage(error.detail));
      }
    } finally {
    }
  };

  return { form, isLoading, onSubmit };
}
