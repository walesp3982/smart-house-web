import { AppDialog } from "@/component/Dialog/AppDialog";
import { useDeleteArea } from "@/hooks/useDeleteArea";
import { AreaType } from "@/store/house-store";
import { Button } from "@mui/material";

interface DeleteAreaDialogProps {
  area: AreaType | null
  active: boolean
  desactivate: () => void
}
export function DeleteAreaDialog({ area, active, desactivate }: DeleteAreaDialogProps) {
  const { onSubmit, isLoading } = useDeleteArea(area?.house_id ?? null, area?.id ?? null)

  return (
    <AppDialog
      open={active}
      onSubmit={onSubmit}
      onClose={desactivate}
      title="Eliminar Área"
      description="¿Seguro que quieres eliminar el área?"
      actions={
        <>
          <Button onClick={desactivate} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Eliminar"}
          </Button>
        </>
      } >

      <></>
    </AppDialog >
  )
}