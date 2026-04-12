"use client";

import {
  Paper,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import styles from "../Dashboard.module.css";
import { translations } from "../tranlations";
import { useInstalledDevicesStore } from "@/store/installed-devices-store";

const t = (key: keyof typeof translations) => translations[key];

export default function DevicesPage() {
  const installedDevices = useInstalledDevicesStore(state => state.installedDevices);

  return (
    <Paper elevation={0} className={styles.card}>
      <Typography variant="h4" className={styles.title}>
        {t("myDevices")}
      </Typography>

      {installedDevices && installedDevices.length === 0 ? (
        <Typography color="text.secondary">{t("noDevices")}</Typography>
      ) : (
        <Stack spacing={2} mt={2}>
          {installedDevices && installedDevices.map((device) => (
            <Box key={device.id} className={styles.deviceItem}>
              <Typography className={styles.deviceCode}>
                {device.id}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
}