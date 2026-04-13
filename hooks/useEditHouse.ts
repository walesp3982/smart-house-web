import { updateHouse } from "@/lib/api/services";
import { useState } from "react";
import * as z from "zod"
import type { HouseType } from "@/store/house-store";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/utils/error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const EditHouseSchema = z.object({
    location: z.string().nullable(),
    name: z.string().min(1, "Se requiere un nombre")
        .max(50, "Limite de caracteres alcanzado")

})

type EditHouseValues = z.infer<typeof EditHouseSchema>


export function useEditHouse(house: HouseType) {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<EditHouseValues>({
        resolver: zodResolver(EditHouseSchema),
        values: {
            name: house.name,
            location: house.location ?? null
        }
    })
    const onSubmit = async (formData: EditHouseValues) => {
        try {
            setIsLoading(true)

            const { data, error } = await updateHouse(house.id, {
                location: formData.location,
                name: formData.name,
            })

            if (data) {
                if (data.updated) {
                    toast.success("Casa actualizada")
                }
                else {
                    toast.info("No se modificó la casa")
                }
            }

            if (error) {
                toast.error(getErrorMessage(error.detail))
            }
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, onSubmit, form }
}