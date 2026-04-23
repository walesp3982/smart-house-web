import { DeviceItem, StatusColor } from "@/component/Devices/Item";
import { DeviceStatus, InstalledDeviceType, selectDeviceState, useInstalledDevicesStore } from "@/store/installed-devices-store";
import { useStateDevice } from "@/hooks/useStateDevice";
import { Box, Grid, Paper } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import MotionPhotosOnIcon from '@mui/icons-material/MotionPhotosAuto';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import VideocamIcon from '@mui/icons-material/Videocam';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import { SvgIconProps } from '@mui/material';

const deviceIconMap: Record<string, React.ElementType> = {
  light: LightModeIcon,
  door: DoorFrontIcon,
  movement: MotionPhotosOnIcon,
  temperature: ThermostatIcon,
  camera: VideocamIcon,
};


export function getDeviceIcon(type: string, props?: SvgIconProps): React.ReactElement {
  const IconComponent = deviceIconMap[type.toLowerCase()] ?? DevicesOtherIcon;
  return <IconComponent {...props} />;
}

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

  const color_status: StatusColor = status === "open" ? "green" : status === "error" ? "red" : "yellow"
  const text_status = (status: DeviceStatus): string => {
    switch (status) {
      case "idle":
        return "Intentando conectarse..."
      case "fetching-ticket":
        return "Obteniendo token..."
      case "connecting":
        return "Conectando..."
      case "open":
        return "Conexión exitosa"
      case "error":
        return "Error en la conexión"
      case "closed":
        return "Conexión cerrada"
    }
  }
  const json_message = JSON.parse(lastMessage ?? '{"message": "json no encontrado"}');
  // const device_icon = (
  //   <DevicesIcon fontSize="small" sx={{ color: "text.secondary" }} />
  // );
  const device_icon = getDeviceIcon(device.device.type)
  return (
    <>
      <DeviceItem
        device_name={device.name}
        onEdit={onEdit}
        indentLevel={indentLevel}
        active={true}
        device_icon={device_icon}
        color={color_status}
      />
      <Box display={"block"}>
        <Paper sx={{
          padding: 1,
        }}>
          {text_status(status)}
        </Paper>
        <Paper sx={{
          padding: 1,
        }}>
          {json_message.message}
        </Paper>


      </Box>

    </>

  );
}