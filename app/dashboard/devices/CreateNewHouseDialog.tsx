import { AppDialog } from "@/component/Dialog/AppDialog";
import { BasicTextField } from "@/component/Form/FormTextField";
import { useNewHouse } from "@/hooks/useNewHouse";
import { Button, Stack } from "@mui/material";

interface CreateNewHouseDialogProps {
    activatedDialog: boolean
    desactivatedDialog: () => void
}

export function CreateNewHouseDialog({
    activatedDialog, desactivatedDialog
}: CreateNewHouseDialogProps) {
    const { form, isLoading, onSubmit } = useNewHouse()
    const { control, handleSubmit } = form;

    return (
        <AppDialog
            open={activatedDialog}
            onClose={desactivatedDialog}
            title="Agregar nueva casa"
            description="ingrese los datos para crear una nueva casa"
            onSubmit={handleSubmit(onSubmit)}
            actions={
                <>
                    <Button onClick={desactivatedDialog} disabled={isLoading}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit" variant="contained" disabled={isLoading}>
                        {isLoading ? "Cargando..." : "Enviar"}
                    </Button>
                </>
            }
        >
            <Stack spacing={2} sx={{ my: 4 }}>
                <BasicTextField
                    control={control}
                    name="name"
                    label="Nombre de la casa"
                />

                <BasicTextField
                    control={control}
                    name="location"
                    label="Ubicación (Opcional)"
                />
            </Stack>
        </AppDialog>
    )
}