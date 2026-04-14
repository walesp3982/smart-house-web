import { deleteArea } from "@/lib/api/services";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteArea(house_id: number | null, area_id: number | null) {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!area_id) {
        toast.error("Area no inicializada")
        return
      }
      if (!house_id) {
        toast.error("Casa no inicializada")
        return
      }
      setIsLoading(true)

      const { data, error } = await deleteArea(house_id, area_id)

      if (data) {
        toast.success("Área eliminada correctamente")
      }
      if (error) {
        toast.error("No se pudo eliminar el área")
      }
    } finally {
      setIsLoading(false)
    }

  }

  return { isLoading, onSubmit }
}