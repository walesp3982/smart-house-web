import { DeviceItem, StatusColor } from "@/component/Devices/Item";
import {
  // DeviceStatus,
  InstalledDeviceType,
  selectDeviceState,
  useInstalledDevicesStore,
} from "@/store/installed-devices-store";
import { useStateDevice } from "@/hooks/useStateDevice";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import MotionPhotosOnIcon from "@mui/icons-material/MotionPhotosAuto";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import VideocamIcon from "@mui/icons-material/Videocam";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import { SvgIconProps } from "@mui/material";
import { useTurnDevice } from "@/hooks/useTurnDevice";

const deviceIconMap: Record<string, React.ElementType> = {
  light: LightModeIcon,
  door: DoorFrontIcon,
  movement: MotionPhotosOnIcon,
  temperature: ThermostatIcon,
  camera: VideocamIcon,
};

export function getDeviceIcon(
  type: string,
  props?: SvgIconProps,
): React.ReactElement {
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
  useStateDevice(device.id);

  const { status, lastMessage } = useInstalledDevicesStore(
    selectDeviceState(device.id),
  );

  const jsonMessage = JSON.parse(lastMessage ?? "{}");
  
  const {turnDevice, loading} = useTurnDevice(device.id, device.device.type,jsonMessage.state);

  const color_status: StatusColor =
    status === "open" ? "green" : status === "error" ? "red" : "yellow";
  const device_icon = getDeviceIcon(device.device.type);
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
      {/* <Paper sx={{
          padding: 1,
        }}>
          {text_status(status)}
        </Paper> */}
      <Paper
        sx={{
          padding: 1,
          gap: 5,
          py: 2,
        }}
      >
        <Stack spacing={2}>
          <KeyValueDisplay data={jsonMessage} />
          <ButtonTurnDevice
            executeAction={() => {
              console.log("Ejecutar acción para dispositivo", device.id);
              console.log("Estado actual:", status);
              console.log("Último mensaje:", jsonMessage);
              turnDevice();
              
            }}
            status={jsonMessage.status === "online" ? jsonMessage.state : undefined}
            loading={loading}
          />
        </Stack>
      </Paper>
    </>
  );
}

interface ButtonTurnDeviceProps {
  executeAction: () => void;
  status?: "on" | "off";
  loading?: boolean;
}

export function ButtonTurnDevice({ executeAction, status = undefined, loading = false}: ButtonTurnDeviceProps) {
  const textButton = status === "on" ? "Apagar" : status === "off" ? "Encender" : "No disponible";
  return (
    <Button fullWidth variant="contained" onClick={executeAction} disabled={status === undefined || loading}
    color={status === "on" ? "error" : status === "off" ? "success" : "primary"}>
      {textButton}
    </Button>
  )
}

const EXCLUDED_KEYS = ["type", "ip", "message", "status"];
interface StateDeviceDisplay {
  data: Record<string, string | number>;
  exclude?: string[];
}

function KeyValueDisplay({
  data,
  exclude = EXCLUDED_KEYS,
}: StateDeviceDisplay) {
  // Exclusión de valores que no queremos mostrar al user
  const entries = Object.entries(data).filter(
    ([key]) => !exclude?.includes(key),
  );

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {entries.map(([key, value], i) => (
        <Box key={key}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              px: 2,
              py: 1.25,
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {key}:
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {String(value)}
            </Typography>
          </Box>
          {i < entries.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}
