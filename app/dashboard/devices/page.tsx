"use client";

import {
  Paper,
  Typography,
  Stack,
  Box,
  Button,
  Grid,
} from "@mui/material";
import styles from "../Dashboard.module.css";
import { translations } from "../tranlations";
import { useState } from "react";
import { HouseType, useHouseStore } from "@/store/house-store";


import { useInstalledDevicesStore } from "@/store/installed-devices-store";
const t = (key: keyof typeof translations) => translations[key];
import type { InstalledDeviceType } from "@/store/installed-devices-store";
import { EditDeviceDrawer } from "./EditDeviceDrawer";
import { CreateNewHouseDialog } from "./CreateNewHouseDialog";
import { DeviceItemActivity, HouseItem } from "./ListDevices";
import EditHouseDrawer from "./EditHouseDrawer";



interface HeaderDevicesProps {
  openDialogHouse: () => void
}

function HeaderDevices({ openDialogHouse }: HeaderDevicesProps) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h4" className={styles.title}>
          {t("myDevices")}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Button variant="contained" size="large" fullWidth
          onClick={openDialogHouse}>
          Agregar Casa
        </Button>
      </Grid>
    </Grid>
  )
}

// ─── DevicesPage ──────────────────────────────────────────────────────────────
export default function DevicesPage() {
  const [dialogNewHouse, setDialogNewHouse] = useState(false);
  const houses = useHouseStore((state) => state.house);
  const installedDevices = useInstalledDevicesStore((state) => state.installedDevices);
  const [editingDevice, setEditingDevice] = useState<InstalledDeviceType | null>(null);
  const [editingHouse, setEditingHouse] = useState<HouseType | null>(null);


  // devices sin ninguna casa asignada
  const orphanDevices = installedDevices?.filter((d) => !d.house_id) ?? [];

  return (
    <>
      <Paper elevation={0} className={styles.card}>
        {/* Header */}
        <HeaderDevices
          openDialogHouse={() => setDialogNewHouse(true)}
        />

        <Stack spacing={2} mt={2}>
          {/* Sección: sin casa */}
          {orphanDevices.length > 0 && (
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary", pl: 0.5 }}>
                Sin casa asignada
              </Typography>
              <Stack spacing={0.5} mt={0.5}>
                {orphanDevices.map((d) => (
                  <DeviceItemActivity key={d.id} device={d} indentLevel={0} onEdit={() => setEditingDevice(d)} />
                ))}
              </Stack>
            </Box>
          )}

          {/* Sección: casas */}
          {houses?.map((house) => (
            <HouseItem
              key={house.id}
              house={house}
              onEditDevice={(device: InstalledDeviceType) => setEditingDevice(device)}
              allDevices={installedDevices ?? []}
              onEditHouse={(house: HouseType) => { setEditingHouse(house) }}
            />
          ))}
        </Stack>
      </Paper>

      <CreateNewHouseDialog
        activatedDialog={dialogNewHouse}
        desactivatedDialog={() => setDialogNewHouse(false)}
      />

      <EditDeviceDrawer
        device={editingDevice}
        open={!!editingDevice}
        onClose={() => setEditingDevice(null)}
      />

      <EditHouseDrawer
        house={editingHouse}
        open={!!editingHouse}
        onClose={() => setEditingHouse(null)}
      />
    </>
  );
}