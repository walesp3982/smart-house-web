import { InstalledDeviceType } from "@/store/installed-devices-store";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DevicesIcon from "@mui/icons-material/Devices";
import type { HouseType, AreaType } from "@/store/house-store";
import { DeviceItem } from "@/component/Devices/Item";
import { Box, Collapse, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import styles from "../Dashboard.module.css";

interface DeviceItemProps {
    device: InstalledDeviceType; // tu tipo del store
    indentLevel?: 0 | 1 | 2;
    onEdit: () => void
}

export function DeviceItemActivity({ device, indentLevel = 0, onEdit }: DeviceItemProps) {
    const device_icon = (
        <DevicesIcon fontSize="small" sx={{ color: "text.secondary" }} />
    )

    return (
        <DeviceItem
            device_name={device.name}
            onEdit={onEdit}
            indentLevel={indentLevel}
            active={true}
            device_icon={device_icon}
        />
    )
}

// ─── AreaItem ─────────────────────────────────────────────────────────────────
interface AreaItemProps {
    area: AreaType; // tu tipo
    devices: InstalledDeviceType[];
    onEditDevice: (device: InstalledDeviceType) => void
}

function AreaItem({ area, devices, onEditDevice }: AreaItemProps) {
    const [open, setOpen] = useState(false);
    const areaDevices = devices.filter((d) => d.area_id === area.id);

    return (
        <Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => setOpen((p) => !p)}
                sx={{
                    pl: 3, pr: 1.5, py: 0.75, borderRadius: 1,
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
                {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </Box>

            <Collapse in={open}>
                <Stack spacing={0.5} mt={0.5}>
                    {areaDevices.length > 0
                        ? areaDevices.map((d) => (
                            <DeviceItemActivity key={d.id} device={d} indentLevel={2} onEdit={() => onEditDevice(d)} />
                        ))
                        : <Typography variant="caption" sx={{ pl: 4.5, color: "text.disabled" }}>
                            Sin dispositivos
                        </Typography>
                    }
                </Stack>
            </Collapse>
        </Box>
    );
}

// ─── HouseItem ────────────────────────────────────────────────────────────────
interface HouseItemProps {
    house: HouseType; // tu tipo
    allDevices: InstalledDeviceType[];
    onEditDevice: (device: InstalledDeviceType) => void
}

export function HouseItem({ house, allDevices, onEditDevice }: HouseItemProps) {
    const [open, setOpen] = useState(false);

    // devices asignados a esta casa pero sin área
    const directDevices = allDevices.filter(
        (d) => d.house_id === house.id && !d.area_id
    );

    return (
        <Box className={styles.deviceItem}>
            {/* Header */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => setOpen((p) => !p)}
                sx={{ cursor: "pointer" }}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <HomeIcon />
                    <Typography className={styles.deviceCode}>{house.name}</Typography>
                    <Typography variant="caption" sx={{ color: "text.disabled" }}>
                        ({(house.areas?.length ?? 0)} áreas)
                    </Typography>
                </Box>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>

            {/* Collapse */}
            <Collapse in={open}>
                <Box mt={1} sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1 }}>
                    <Stack spacing={0.5}>
                        {/* devices directos sin área */}
                        {directDevices.map((d) => (
                            <DeviceItemActivity key={d.id} device={d} indentLevel={1} onEdit={() => onEditDevice(d)} />
                        ))}

                        {directDevices.length > 0 && house.areas && house.areas.length > 0 && (
                            <Divider sx={{ my: 0.5 }} />
                        )}

                        {/* áreas */}
                        {house.areas?.map((area) => (
                            <AreaItem key={area.id} area={area} devices={allDevices} onEditDevice={onEditDevice} />
                        ))}

                        {directDevices.length === 0 && !house.areas?.length && (
                            <Typography variant="caption" sx={{ pl: 1.5, color: "text.disabled" }}>
                                Sin dispositivos ni áreas
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </Collapse>
        </Box>
    );
}