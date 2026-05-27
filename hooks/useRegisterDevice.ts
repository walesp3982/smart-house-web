import { useState } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { getInstalledDeviceById, registerInstalledDevice } from "@/lib/api/services";
import { getErrorMessage } from "@/lib/api/utils/error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInstalledDevicesStore } from "@/store/installed-devices-store";

const registerDeviceSchema = z.object({
  name: z.string().min(1, "Tiene que colocar un nombre"),
  uuid: z.uuid("UUID inválida").min(1, "Coloca el uuid de dispositivo"),
  code_verificacion: z.string().min(1, "Coloca el código de verificación"),
});

type RegisterDeviceValues = z.infer<typeof registerDeviceSchema>;

export function useRegisterDevice() {
  const [isLoading, setIsLoading] = useState(false);
  const addInstalledDevices = useInstalledDevicesStore((state) => state.addInstalledDevices)
  const form = useForm<RegisterDeviceValues>({
    defaultValues: { code_verificacion: "", name: "", uuid: "" },
    resolver: zodResolver(registerDeviceSchema),
  });
  const onSubmit = async (formData: RegisterDeviceValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await registerInstalledDevice({
        name: formData.name,
        code_verification: formData.code_verificacion,
        uuid: formData.uuid,
      });

      if (data) {
        if (!data.id) {
          toast.error("Internal Server Error")
          return
        }

        const { data: getData, error: getError } = await getInstalledDeviceById(data.id)

        if (getData) {
          addInstalledDevices(getData)
          toast.success(`El dispositivo ${getData.name} con uuid:${getData.device.device_uuid} fue registrado exitosamente`)
          form.reset()
          return
        }

        if (getError) {
          toast.error(getErrorMessage(getError.detail))
        }
      }
      // Obtenemos el installedDevice con el join
      if (error) {
        toast.error(getErrorMessage(error.detail));
      }
    } finally {
      setIsLoading(false)
    }
  };

  return { form, isLoading, onSubmit };
}
