import DevicesIcon from "@mui/icons-material/Devices";
import { DeviceItem } from "@/component/Devices/Item";
import { InstalledDeviceType, selectDeviceState, useInstalledDevicesStore } from "@/store/installed-devices-store";
import { useStateDevice } from "@/hooks/useStateDevice";
import { Box, Grid, Typography } from "@mui/material";

interface DeviceContainerProps {
  devices: InstalledDeviceType[]; // tu tipo del store
  onEdit: (device: InstalledDeviceType) => void;
}


export function DeviceContainer({ devices, onEdit }: DeviceContainerProps) {
  return (
    <Grid container spacing={2}>
      {devices.map((device) => (
        <Grid size={{ xs: 12, sm: 12, md: 6 }} key={device.id}>
          <Box>
            <DeviceItemActivity device={device} onEdit={() => onEdit(device)} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

interface DeviceItemProps {
  device: InstalledDeviceType; // tu tipo del store
  indentLevel?: 0 | 1 | 2;
  onEdit: () => void;
}

export function DeviceItemActivity({
  device,
  indentLevel = 0,
  onEdit,
}: DeviceItemProps) {
  useStateDevice(device.id)

  const { status, lastMessage } = useInstalledDevicesStore(
    selectDeviceState(device.id)
  )

  const device_icon = (
    <DevicesIcon fontSize="small" sx={{ color: "text.secondary" }} />
  );

  return (
    <>
      <DeviceItem
        device_name={device.name}
        onEdit={onEdit}
        indentLevel={indentLevel}
        active={true}
        device_icon={device_icon}
      />
      <Typography>
        {status}
      </Typography>
      <Typography>
        {lastMessage}
      </Typography>
    </>

  );
}