import { useState } from "react";
import { createArea } from "@/lib/api/services";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/utils/error";
import { getAllHousesUser } from "@/actions/houses/houses.actions";
import { useHouseStore } from "@/store/house-store";

export const rooms = ["living_room", "bedroom", "kitchen", "outside"] as const;

const CreateAreaSchema = z.object({
    name: z.string().min(1, "Campo requerido").max(50, "Límite de caracteres alcanzado"),
    type: z.enum(rooms),
})

type CreateAreaValues = z.infer<typeof CreateAreaSchema>

export function useCreateArea(house_id: number | null) {
    const [isLoading, setIsLoading] = useState(false)
    const setHouses = useHouseStore(state => state.setHouse)
    const form = useForm<CreateAreaValues>({
        defaultValues: {
            name: "",
            type: "bedroom",
        },
        resolver: zodResolver(CreateAreaSchema)
    })

    const onSubmit = async (formData: CreateAreaValues) => {
        try {
            if (!house_id) {
                toast.error("Error: casa inválida")
                return
            }
            setIsLoading(true)

            const { data, error } = await createArea(house_id, {
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