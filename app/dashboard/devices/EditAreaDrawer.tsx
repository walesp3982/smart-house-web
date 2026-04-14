import AppDrawer from "@/component/Drawer";
import { BasicTextField } from "@/component/Form/FormTextField";
import { useEditArea } from "@/hooks/useEditArea";
import type { AreaType } from "@/store/house-store";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";


interface EditHouseDrawerProps {
    area: AreaType | null
    onClose: () => void
    open: boolean
}

export function EditAreaDrawer({ area, onClose, open }: EditHouseDrawerProps) {
    const { form, onSubmit } = useEditArea(area)
    const { control, handleSubmit, formState: { errors } } = form
    return (
        <AppDrawer
            title={area?.name ?? ""}
            subtitle="Editar casa"
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            open={open}>

            <BasicTextField
                control={control}
                name="name"
                label="Nombre"
            />

            <Controller
                name="type"
                control={control}
                rules={{ required: "Selecciona el tipo de área" }} // validación obligatoria
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.type}>
                        <InputLabel id="area-label">Tipo de área</InputLabel>
                        <Select
                            {...field}
                            labelId="tipo-area-label"
                            label="Tipo de área"
                        >
                            <MenuItem value="living_room">Sala</MenuItem>
                            <MenuItem value="bedroom">Habitación</MenuItem>
                            <MenuItem value="kitchen">Cocina</MenuItem>
                            <MenuItem value="outside">Afuera</MenuItem>
                        </Select>
                        {errors.type && (
                            <FormHelperText>{errors.type.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

        </AppDrawer>
    )
}