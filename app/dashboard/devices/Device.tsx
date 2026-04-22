import DevicesIcon from "@mui/icons-material/Devices";
import { DeviceItem } from "@/component/Devices/Item";
import { InstalledDeviceType, selectDeviceState, useInstalledDevicesStore } from "@/store/installed-devices-store";
import { useStateDevice } from "@/hooks/useStateDevice";
import { Typography } from "@mui/material";

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