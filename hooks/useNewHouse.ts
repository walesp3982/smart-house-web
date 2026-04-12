import * as z from "zod"
import { createHouse } from "@/lib/api/services"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/utils/error"
import { useHouseStore } from "@/store/house-store"
import { getAllHousesUser } from "@/actions/houses/houses.actions"

const NewHouseSchema = z.object({
    name: z.string().min(1, "Se requiere un nombre"),
    location: z.string(),
})

type NewHouseValues = z.infer<typeof NewHouseSchema>

export function useNewHouse() {
    const [isLoading, setIsLoading] = useState(false)
    const houses = useHouseStore(state => state.house)
    const setHouses = useHouseStore(state => state.setHouse)

    const form = useForm<NewHouseValues>({
        defaultValues: {
            name: "",
            location: "",
        },
        resolver: zodResolver(NewHouseSchema)
    }
    )
    const onSubmit = async (formData: NewHouseValues) => {
        try {
            setIsLoading(true)
            if (!houses) {
                toast.error("Las casas no fue cargada correctamente");
                return;
            }
            if (houses.some(house => house.name === formData.name)) {
                toast.error("Ya existe una casa con el mismo nombre")
                return;
            }

            const { data, error } = await createHouse({
                ...formData,
                invitation_validation: true
            })

            if (data) {
                toast.success("Casa creada correctamente")
                const newHouseData = await getAllHousesUser()
                if (newHouseData) {
                    setHouses(newHouseData)
                } else {
                    toast.error("No se puedo obtener los nuevo valores de houses: 500 Server Error")
                }
            }

            if (error) {
                toast.error(getErrorMessage(error.detail))
            }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        form, isLoading, onSubmit
    }



}