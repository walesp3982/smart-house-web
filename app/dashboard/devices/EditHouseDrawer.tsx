import AppDrawer from "@/component/Drawer";
import { BasicTextField } from "@/component/Form/FormTextField";
import { useEditHouse } from "@/hooks/useEditHouse";
import type { HouseType } from "@/store/house-store";


interface EditHouseDrawerProps {
    house: HouseType | null
    onClose: () => void
    open: boolean
}

export default function EditHouseDrawer({ house, onClose, open }: EditHouseDrawerProps) {
    const { form, onSubmit } = useEditHouse(house)
    const { control, handleSubmit } = form
    return (
        <AppDrawer
            title={house?.name ?? ""}
            subtitle="Editar casa"
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            open={open}>

            <BasicTextField
                control={control}
                name="name"
                label="Nombre"
            />

            <BasicTextField
                control={control}
                name="location"
                label="Ubicación(Opcional)"
            />

        </AppDrawer>
    )
}