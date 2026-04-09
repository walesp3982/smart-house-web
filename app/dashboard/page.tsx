"use client";

import { useState } from "react";
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
} from "@mui/material";
import { AddCircleOutline as AddIcon } from "@mui/icons-material";
import styles from "./Dashboard.module.css";
import { translations } from "./tranlations";

const t = (key: keyof typeof translations) => translations[key];

export default function DashboardHomePage() {

  const [deviceCode, setDeviceCode] = useState("");
  const [deviceDescription, setDeviceDescription] = useState("");
  const [selectedHouseId, setSelectedHouseId] = useState<number | "">("");

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
              >
                <MenuItem value="algo">
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      algo
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      algo
                    </Typography>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              // className={styles.newHouseButton}
              sx={{ whiteSpace: "nowrap", height: 56 }}
            >
              {t("newHouseButton")}
            </Button>
          </Box>

          <Button variant="contained" fullWidth>
            {t("addDeviceButton")}
          </Button>
        </Stack>
      </Paper>
    </>
  );
}
