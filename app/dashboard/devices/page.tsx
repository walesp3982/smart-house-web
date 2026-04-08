"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useDashboard } from "../DashboardContext";
import { PREDEFINED_HOUSES, getHouseNameById } from "../dashboardUtils";
import styles from "../Dashboard.module.css";
import { translations } from "../tranlations";

const t = (key: keyof typeof translations) => translations[key];

export default function DevicesPage() {
  const { devices, setDevices, customHouses } = useDashboard();
  const [openEditDeviceDialog, setOpenEditDeviceDialog] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<
    (typeof devices)[0] | null
  >(null);
  const [editDeviceCode, setEditDeviceCode] = useState("");
  const [editDeviceDescription, setEditDeviceDescription] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<
    (typeof devices)[0] | null
  >(null);

  const allHouses = useMemo(
    () => [...PREDEFINED_HOUSES, ...customHouses],
    [customHouses],
  );

  const handleEditDevice = useCallback((device: (typeof devices)[0]) => {
    setCurrentDevice(device);
    setEditDeviceCode(device.code);
    setEditDeviceDescription(device.description || "");
    setOpenEditDeviceDialog(true);
  }, []);

  const handleSaveEditDevice = useCallback(() => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === currentDevice?.id
          ? {
              ...d,
              code: editDeviceCode.trim(),
              description: editDeviceDescription.trim() || undefined,
            }
          : d,
      ),
    );
    setOpenEditDeviceDialog(false);
    setCurrentDevice(null);
  }, [editDeviceCode, editDeviceDescription, currentDevice, setDevices]);

  const handleDeleteDevice = useCallback((device: (typeof devices)[0]) => {
    setDeviceToDelete(device);
    setDeleteConfirmOpen(true);
  }, []);

  const confirmDeleteDevice = useCallback(() => {
    if (!deviceToDelete) return;
    setDevices((prev) => prev.filter((d) => d.id !== deviceToDelete.id));
    setDeleteConfirmOpen(false);
    setDeviceToDelete(null);
  }, [deviceToDelete, setDevices]);

  return (
    <>
      <Paper elevation={0} className={styles.card}>
        <Typography variant="h4" className={styles.title}>
          {t("myDevices")}
        </Typography>

        {devices.length === 0 ? (
          <Typography color="text.secondary">{t("noDevices")}</Typography>
        ) : (
          <Stack spacing={2} mt={2}>
            {devices.map((device) => (
              <Box key={device.id} className={styles.deviceItem}>
                <Box flex={1}>
                  <Typography className={styles.deviceCode}>
                    {device.code}
                  </Typography>
                  {device.description && (
                    <Typography className={styles.deviceDescription}>
                      {device.description}
                    </Typography>
                  )}
                  <Typography className={styles.deviceMeta}>
                    {t("houseLabel")}:{" "}
                    {getHouseNameById(allHouses, device.houseId)} &nbsp;·&nbsp;{" "}
                    {t("addedLabel")}: {device.addedAt}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleEditDevice(device)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteDevice(device)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Paper>

      {/* DIALOG: Editar Dispositivo */}
      <Dialog
        open={openEditDeviceDialog}
        onClose={() => setOpenEditDeviceDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{t("editDevice")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="outlined"
            label={t("deviceCodeEditLabel")}
            value={editDeviceCode}
            onChange={(e) => setEditDeviceCode(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="outlined"
            label={t("deviceDescriptionLabel")}
            value={editDeviceDescription}
            onChange={(e) => setEditDeviceDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDeviceDialog(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSaveEditDevice} variant="contained">
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG: Confirmar eliminación */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{t("deleteConfirmTitle")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("deleteConfirmMessage").replace(
              "{device}",
              deviceToDelete?.code ?? "",
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>
            {t("cancel")}
          </Button>
          <Button
            onClick={confirmDeleteDevice}
            color="error"
            variant="contained"
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
