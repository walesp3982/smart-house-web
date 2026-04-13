import { deleteHouse } from "@/lib/api/services";
import { useInstalledDevicesStore } from "@/store/installed-devices-store";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteHouse(house_id: number | null) {
  const [isLoading, setIsLoading] = useState(false);
  const installed_device = useInstalledDevicesStore(
    (state) => state.installedDevices,
  );
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!installed_device) {
      toast.error("Dispositivos no encontrados");
      return;
    }

    if (!house_id) {
      toast.error("No se cargó el house");
      return;
    }

    try {
      setIsLoading(true);

      const installed_device_house: number = installed_device.filter(
        (device) => device.house_id === house_id,
      ).length;

      if (installed_device_house > 0) {
        toast.info("Antes de eliminar mueva los dispositivos a otra casa");
        return;
      }

      const { data, error } = await deleteHouse(house_id);

      if (data) {
        toast.success("Casa elimada correctamente");
      }

      if (error) {
        toast.error("Error al eliminar la casa ");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit };
}
