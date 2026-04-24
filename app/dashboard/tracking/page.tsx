"use client";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "../Dashboard.module.css";
import { translations } from "../tranlations";
import { getTrackData } from "@/actions/track.actions";
import { useEffect, useState } from "react";
import { TrackDeviceType } from "@/lib/api/services";

const t = (key: keyof typeof translations) => translations[key];

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleString("es-BO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TrackingPage() {
  const [data, setData] = useState<TrackDeviceType[] | null>(null);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getTrackData().then((d) => setData(d));
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Paper elevation={0} className={styles.card}>
      <Typography variant="h4" className={styles.title}>
        {t("trackingTitle")}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {t("trackingDescription")}
      </Typography>
      {!data ? (
        <Box className={styles.trackingPlaceholder}>
          <Typography variant="body2" color="text.secondary" align="center">
            {t("trackingPlaceholder")}
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hora del comando</TableCell>
                <TableCell>Dispositivo</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{formatDate(row.timestamp)}</TableCell>
                  <TableCell>{row.device_id}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
