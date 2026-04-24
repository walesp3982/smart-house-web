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
  Tooltip,
  Typography,
} from "@mui/material";
import styles from "../Dashboard.module.css";
import { translations } from "../tranlations";
import { getTrackData } from "@/actions/track.actions";
import { useEffect, useState } from "react";
import { TrackDeviceType } from "@/lib/api/services";
import {
  InstalledDeviceType,
  useInstalledDevicesStore,
} from "@/store/installed-devices-store";
import { useHouseStore } from "@/store/house-store";

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

interface MetadataDeviceProps {
  device?: InstalledDeviceType;
}
function MetadataDevice({ device }: MetadataDeviceProps) {
  const houses = useHouseStore((state) => state.house);
  const actual_house = houses?.find((h) => h.id == device?.house_id);
  const actual_area = actual_house?.areas.find((a) => a.id == device?.id);
  return (
    <Tooltip
      title={
        <div style={{ padding: 4, fontSize: "1rem" }}>
          <div>
            <b>Tipo:</b> {device?.device.type}
          </div>
          <div>
            <b>UUID: </b> {device?.device.device_uuid}
          </div>
          <div>
            <b>Casa:</b> {actual_house?.name ?? "(Ninguna)"}
          </div>
          <div>
            <b>Area: </b> {actual_area?.name ?? "(Ninguna)"}
          </div>
        </div>
      }
    >
      <span style={{ cursor: "pointer" }}>{device?.name}</span>
    </Tooltip>
  );
}

export default function TrackingPage() {
  const [data, setData] = useState<TrackDeviceType[] | null>(null);
  const installed_devices = useInstalledDevicesStore(
    (state) => state.installedDevices,
  );
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getTrackData().then((d) => {
        d?.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        setData(d);
      });
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
      {!data || data.length == 0 ? (
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
                  <TableCell>
                    <MetadataDevice
                      device={installed_devices?.find(
                        (d) => d.id == row.device_id,
                      )}
                    />
                  </TableCell>
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
