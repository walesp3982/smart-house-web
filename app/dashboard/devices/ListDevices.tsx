import { InstalledDeviceType } from "@/store/installed-devices-store";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings"
import type { HouseType, AreaType } from "@/store/house-store";
import { DeviceContainer, DeviceItemActivity } from "./Device";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styles from "../Dashboard.module.css";




// ─── AreaItem ─────────────────────────────────────────────────────────────────
interface AreaItemProps {
  area: AreaType; // tu tipo
  devices: InstalledDeviceType[];
  onEditDevice: (device: InstalledDeviceType) => void;
  onEditArea: (area: AreaType) => void;
  onDeleteArea: (area: AreaType) => void;

}

function AreaItem({ area, devices, onEditDevice, onEditArea, onDeleteArea }: AreaItemProps) {
  const [open, setOpen] = useState(false);
  const areaDevices = devices.filter((d) => d.area_id === area.id);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  // handle para el menú
  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        onClick={undefined}
        sx={{
          pl: 3,
          pr: 1.5,
          py: 0.75,
          borderRadius: 1,
          "&:hover": { bgcolor: "action.hover", cursor: "pointer" },
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <MeetingRoomIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <Typography variant="body2">{area.name}</Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            ({areaDevices.length})
          </Typography>
        </Box>
        <Box display="flex" gap={0}>
          <IconButton onClick={handleOpenMenu} size="small">
            <SettingsIcon />
          </IconButton>
          {/* <IconButton onClick={() => onDeleteArea(area)} size="small">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => onEditArea(area)} size="small">
            <EditIcon />
          </IconButton> */}

          <IconButton onClick={() => setOpen((p) => !p)} size="small">
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleCloseMenu}
            slotProps={{ paper: { sx: { minWidth: 140 } } }}
          >
            <MenuItem
              onClick={() => {
                onEditArea(area);
                handleCloseMenu();
              }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Editar</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                onDeleteArea(area);
                handleCloseMenu();
              }}
              sx={{ color: "error.main" }}
            >
              <ListItemIcon sx={{ color: "error.main" }}>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Eliminar</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
        {/* {open ? (
          <ExpandLessIcon fontSize="small" />
        ) : (
          <ExpandMoreIcon fontSize="small" />
        )} */}
      </Box>

      <Collapse in={open}>
        <Stack spacing={0.5} mt={0.5}>
          {areaDevices.length > 0 ? (
            areaDevices.map((d) => (
              <DeviceItemActivity
                key={d.id}
                device={d}
                indentLevel={2}
                onEdit={() => onEditDevice(d)}
              />
            ))
          ) : (
            <Typography
              variant="caption"
              sx={{ pl: 4.5, color: "text.disabled" }}
            >
              Sin dispositivos
            </Typography>
          )}
        </Stack>
      </Collapse>
    </Box>
  );
}

// ─── HouseItem ────────────────────────────────────────────────────────────────
interface HouseItemProps {
  house: HouseType; // tu tipo
  allDevices: InstalledDeviceType[];
  onEditDevice: (device: InstalledDeviceType) => void;
  onEditHouse: (house: HouseType) => void;
  onDeleteHouse: (house: HouseType) => void;
  onCreateArea: (house: HouseType) => void;
  onDeleteArea: (area: AreaType) => void;
  onEditArea: (area: AreaType) => void;
}

export function HouseItem({
  house,
  allDevices,
  onEditDevice,
  onEditHouse: editHouse,
  onDeleteHouse,
  onCreateArea,
  onDeleteArea,
  onEditArea,

}: HouseItemProps) {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  // handle para el menú
  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => setAnchorEl(null);

  // devices asignados a esta casa pero sin área
  const directDevices = allDevices.filter(
    (d) => d.house_id === house.id && !d.area_id,
  );

  return (
    <Box className={styles.deviceItem} display={"block"}>
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        onClick={undefined}
        sx={{ cursor: "pointer" }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          justifyContent={"space-between"}
        // onClick={
        //     () => setOpen((p) => !p)
        // }
        >
          <HomeIcon />
          <Typography className={styles.deviceCode}>{house.name}</Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            ({house.areas?.length ?? 0} áreas)
          </Typography>
        </Box>

        <Box display="flex" gap={0}>
          <IconButton onClick={handleOpenMenu} size="small">
            <SettingsIcon />
          </IconButton>
          {/* <IconButton onClick={() => onDeleteHouse(house)} size="small">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => editHouse(house)} size="small">
            <EditIcon />
          </IconButton> */}
          <IconButton onClick={() => setOpen((p) => !p)} size="small">
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleCloseMenu}
            slotProps={{ paper: { sx: { minWidth: 140 } } }}
          >
            <MenuItem
              onClick={() => {
                onCreateArea(house);
                handleCloseMenu();
              }}
            >
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Nueva área</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                editHouse(house);
                handleCloseMenu();
              }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Editar</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                onDeleteHouse(house);
                handleCloseMenu();
              }}
              sx={{ color: "error.main" }}
            >
              <ListItemIcon sx={{ color: "error.main" }}>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Eliminar</ListItemText>
            </MenuItem>

          </Menu>
        </Box>
      </Box>

      {/* Collapse */}
      <Collapse in={open}>
        <Box
          mt={1}
          sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1 }}
        >
          <Stack spacing={0.5}>
            {/* devices directos sin área */}
            <DeviceContainer
              devices={directDevices}
              onEdit={(device: InstalledDeviceType) => onEditDevice(device)} />

            {/* {directDevices.map((d) => (
              <DeviceItemActivity
                key={d.id}
                device={d}
                indentLevel={1}
                onEdit={() => onEditDevice(d)}
              />
            ))} */}

            {directDevices.length > 0 &&
              house.areas &&
              house.areas.length > 0 && <Divider sx={{ my: 0.5 }} />}

            {/* áreas */}
            {house.areas?.map((area) => (
              <AreaItem
                key={area.id}
                area={area}
                devices={allDevices}
                onEditDevice={onEditDevice}
                onDeleteArea={onDeleteArea}
                onEditArea={onEditArea}
              />
            ))}

            {directDevices.length === 0 && !house.areas?.length && (
              <Typography
                variant="caption"
                sx={{ pl: 1.5, color: "text.disabled" }}
              >
                Sin dispositivos ni áreas <Link
                  onClick={() => onCreateArea(house)} sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "red",
                      textDecoration: "underline",
                      backgroundColor: "rgba(0,0,0,0.05)",
                    },
                  }} >Crear nueva área</Link>
              </Typography>
            )}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}
