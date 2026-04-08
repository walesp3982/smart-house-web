"use client";

import { Box, Paper, Typography } from "@mui/material";
import styles from "../Dashboard.module.css";
import { translations } from "../tranlations";

const t = (key: keyof typeof translations) => translations[key];

export default function TrackingPage() {
  return (
    <Paper elevation={0} className={styles.card}>
      <Typography variant="h4" className={styles.title}>
        {t("trackingTitle")}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {t("trackingDescription")}
      </Typography>
      <Box className={styles.trackingPlaceholder}>
        <Typography variant="body2" color="text.secondary" align="center">
          {t("trackingPlaceholder")}
        </Typography>
      </Box>
    </Paper>
  );
}
