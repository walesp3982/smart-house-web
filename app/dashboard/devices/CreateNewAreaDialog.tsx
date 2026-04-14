import { AppDialog } from "@/component/Dialog/AppDialog";
import { BasicTextField } from "@/component/Form/FormTextField";
import { useCreateArea } from "@/hooks/useCreateArea";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { Controller } from "react-hook-form";

interface CreateNewAreaDialogProps {
  house_id: number | null
  active: boolean
  desactivate: () => void
}
export function CreateNewAreaDialog({ house_id, active, desactivate }: CreateNewAreaDialogProps) {
  const { form, isLoading, onSubmit } = useCreateArea(house_id)
  const { handleSubmit, control, formState: { errors } } = form

  return (
    <AppDialog
      open={active}
      onClose={desactivate}
      title={"Agregar nueva área"}
      description="Ingrese los datos para la creación de una nueva área"
      onSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <Button onClick={desactivate} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Enviar"}
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ my: 4 }}>
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
              <InputLabel id="role-label">Tipo de área</InputLabel>
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
      </Stack>

    </AppDialog>
  )
}