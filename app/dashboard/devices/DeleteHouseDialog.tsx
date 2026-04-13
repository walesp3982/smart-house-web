import { AppDialog } from "@/component/Dialog/AppDialog";
import { useDeleteHouse } from "@/hooks/useDeleteHouse";
import { HouseType } from "@/store/house-store";
import { Button } from "@mui/material";

interface DeleteHouseDialogProps {
  house: HouseType | null;
  activatedDialog: boolean;
  desactivatedDialog: () => void;
}

export function DeleteHouseDialog({
  house,
  activatedDialog,
  desactivatedDialog,
}: DeleteHouseDialogProps) {
  const { isLoading, onSubmit } = useDeleteHouse(house?.id ?? null);
  return (
    <AppDialog
      open={activatedDialog}
      onClose={desactivatedDialog}
      title="Eliminar casa"
      description="¿Seguro que quiere eliminar la casa?"
      onSubmit={onSubmit}
      actions={
        <>
          <Button onClick={desactivatedDialog} disabled={isLoading}>
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
      }
    >
      <></>
    </AppDialog>
  );
}
