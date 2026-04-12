"use client";

import {
  Paper,
  Typography,
  Stack,
  Box,
  Button,
} from "@mui/material";
import styles from "../Dashboard.module.css";
import { translations } from "../tranlations";
import { useInstalledDevicesStore } from "@/store/installed-devices-store";
import { AppDialog } from "@/component/Dialog/AppDialog";
import { useState } from "react";
import { useNewHouse } from "@/hooks/useNewHouse";
import { BasicTextField } from "@/component/Form/FormTextField";

const t = (key: keyof typeof translations) => translations[key];


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


export default function DevicesPage() {
  const installedDevices = useInstalledDevicesStore(state => state.installedDevices);
  const [dialogNewHouse, setDialogNewHouse] = useState(false)

  return (
    <>
      <Paper elevation={0} className={styles.card}>
        <Typography variant="h4" className={styles.title}>
          {t("myDevices")}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          onClick={() => setDialogNewHouse(true)}
        >Agregar Casa</Button>
        {installedDevices && installedDevices.length === 0 ? (
          <Typography color="text.secondary">{t("noDevices")}</Typography>
        ) : (
          <Stack spacing={2} mt={2}>
            {installedDevices && installedDevices.map((device) => (
              <Box key={device.id} className={styles.deviceItem}>
                <Typography className={styles.deviceCode}>
                  {device.id} {device.name}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Paper>

      <CreateNewHouseDialog
        activatedDialog={dialogNewHouse}
        desactivatedDialog={() => setDialogNewHouse(false)}
      />
    </>
  );
}