import { getAllHousesUser } from "@/actions/houses/houses.actions";
import { patchArea } from "@/lib/api/services";
import { getErrorMessage } from "@/lib/api/utils/error";
import { AreaType, useHouseStore } from "@/store/house-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod"


export const rooms = ["living_room", "bedroom", "kitchen", "outside"] as const;

const UpdateAreaSchema = z.object({
    name: z.string().min(1, "Se requiere este campo").max(50, "Limite de caracteres alcanzado"),
    type: z.enum(rooms)
})

type UpdateAreaValues = z.infer<typeof UpdateAreaSchema>

export function useEditArea(area: AreaType | null) {
    const [isLoading, setIsLoading] = useState(false)
    const setHouses = useHouseStore(state => state.setHouse)
    const form = useForm<UpdateAreaValues>({
        values: {
            name: area?.name ?? "",
            type: area?.type ?? "bedroom",
        },
        resolver: zodResolver(UpdateAreaSchema)
    })

    const onSubmit = async (formData: UpdateAreaValues) => {
        try {
            if (!area) {
                toast.error("Area no inicializada")
                return
            }
            setIsLoading(true)

            const { data, error } = await patchArea(area.house_id, area.id, {
                name: formData.name,
                type: formData.type,
            })

            if (data) {
                toast.success("Área creada correctamente")
                const newHouseData = await getAllHousesUser()
                if (newHouseData) {
                    setHouses(newHouseData)
                } else {
                    toast.error("No se puedo obtener los nuevos valores")
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