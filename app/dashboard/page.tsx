"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AddCircleOutline as AddIcon } from "@mui/icons-material";
import styles from "./Dashboard.module.css";
import { translations } from "./tranlations";
import { useDashboard } from "./DashboardContext";
import { PREDEFINED_HOUSES, House } from "./dashboardUtils";

const t = (key: keyof typeof translations) => translations[key];

export default function DashboardHomePage() {
  const { customHouses, setCustomHouses, setDevices, showSnackbar } =
    useDashboard();

  const [deviceCode, setDeviceCode] = useState("");
  const [deviceDescription, setDeviceDescription] = useState("");
  const [selectedHouseId, setSelectedHouseId] = useState<number | "">("");
  const [openNewHouseDialog, setOpenNewHouseDialog] = useState(false);
  const [newHouseName, setNewHouseName] = useState("");
  const [newHouseDescription, setNewHouseDescription] = useState("");

  const allHouses = useMemo(
    () => [...PREDEFINED_HOUSES, ...customHouses],
    [customHouses],
  );

  const handleAddDevice = useCallback(() => {
    if (!deviceCode.trim())
      return showSnackbar(t("snackbarErrorDeviceCode"), "error");
    if (!selectedHouseId)
      return showSnackbar(t("snackbarErrorSelectHouse"), "error");

    setDevices((prev) => [
      ...prev,
      {
        id: Date.now(),
        code: deviceCode.trim(),
        description: deviceDescription.trim() || undefined,
        houseId: selectedHouseId as number,
        addedAt: new Date().toLocaleString(),
      },
    ]);
    setDeviceCode("");
    setDeviceDescription("");
    showSnackbar(t("snackbarDeviceAdded"), "success");
  }, [
    deviceCode,
    selectedHouseId,
    deviceDescription,
    setDevices,
    showSnackbar,
  ]);

  const handleAddNewHouse = useCallback(() => {
    if (!newHouseName.trim())
      return showSnackbar(t("snackbarErrorHouseName"), "error");

    const newId = Math.max(...allHouses.map((h) => h.id), 0) + 1;
    const newHouse: House = {
      id: newId,
      name: newHouseName.trim(),
      description: newHouseDescription.trim() || "Sin descripción",
    };
    setCustomHouses((prev) => [...prev, newHouse]);
    setSelectedHouseId(newId);
    setNewHouseName("");
    setNewHouseDescription("");
    setOpenNewHouseDialog(false);
    showSnackbar(
      t("snackbarHouseAdded").replace("{name}", newHouse.name),
      "success",
    );
  }, [
    newHouseName,
    newHouseDescription,
    allHouses,
    setCustomHouses,
    showSnackbar,
  ]);

  return (
    <>
      <Paper elevation={0} className={styles.card}>
        <Typography variant="h3" className={styles.title}>
          {t("welcome")}
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          {t("enterDeviceCode")}
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label={t("deviceCodeLabel")}
            variant="outlined"
            placeholder={t("deviceCodePlaceholder")}
            value={deviceCode}
            onChange={(e) => setDeviceCode(e.target.value)}
          />
          <TextField
            fullWidth
            label={t("deviceDescriptionLabel")}
            variant="outlined"
            placeholder={t("deviceDescriptionPlaceholder")}
            value={deviceDescription}
            onChange={(e) => setDeviceDescription(e.target.value)}
          />

          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{t("selectHouseLabel")}</InputLabel>
              <Select
                value={selectedHouseId}
                label={t("selectHouseLabel")}
                onChange={(e) => setSelectedHouseId(e.target.value as number)}
                renderValue={(value) =>
                  allHouses.find((h) => h.id === value)?.name ?? ""
                }
              >
                {allHouses.map((house) => (
                  <MenuItem key={house.id} value={house.id}>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {house.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {house.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOpenNewHouseDialog(true)}
              className={styles.newHouseButton}
              sx={{ whiteSpace: "nowrap", height: 56 }}
            >
              {t("newHouseButton")}
            </Button>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleAddDevice}
            className={styles.addDeviceButton}
          >
            {t("addDeviceButton")}
          </Button>
        </Stack>
      </Paper>

      {/* DIALOG: Nueva Casa */}
      <Dialog
        open={openNewHouseDialog}
        onClose={() => setOpenNewHouseDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{t("newHouseDialogTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="outlined"
            label={t("houseNameLabel")}
            value={newHouseName}
            onChange={(e) => setNewHouseName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="outlined"
            label={t("houseDescriptionLabel")}
            value={newHouseDescription}
            onChange={(e) => setNewHouseDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewHouseDialog(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleAddNewHouse} variant="contained">
            {t("add")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
