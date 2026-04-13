// ─── EditDeviceDrawer ─────────────────────────────────────────────────────────
import { BasicTextField } from "@/component/Form/FormTextField";
import { useEditDevice } from "@/hooks/useEditDevice";
import { useHouseStore } from "@/store/house-store";
import { InstalledDeviceType } from "@/store/installed-devices-store";
import {
    Select, MenuItem, FormControl, InputLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import AppDrawer from "@/component/Drawer";


interface EditDeviceDrawerProps {
    device: InstalledDeviceType;
    open: boolean;
    onClose: () => void;
}

export function EditDeviceDrawer({ device, open, onClose }: EditDeviceDrawerProps) {
    const houses = useHouseStore((state) => state.house);
    const { form, selectedHouse, handleHouseChange, onSubmit } = useEditDevice(device, onClose);
    const { control, handleSubmit, watch } = form;

    return (
        <AppDrawer
            open={open}
            onClose={onClose}
            title="EditarDispositivo"
            subtitle={device?.device.device_uuid}
            onSubmit={handleSubmit(onSubmit)}

        >
            <BasicTextField
                control={control}
                name="name"
                label="Nombre"
            />

            {/* Casa */}
            <FormControl fullWidth>
                <InputLabel>Casa</InputLabel>
                <Select
                    value={watch("house_id") ?? ""}
                    label="Casa"
                    onChange={(e) => handleHouseChange(e.target.value ? Number(e.target.value) : null)}
                >
                    <MenuItem value="">Sin casa</MenuItem>
                    {houses?.map((h) => (
                        <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Área — solo aparece si hay casa seleccionada con áreas */}
            {selectedHouse?.areas && selectedHouse.areas.length > 0 && (
                <FormControl fullWidth>
                    <InputLabel>Área</InputLabel>
                    <Controller
                        control={control}
                        name="area_id"
                        render={({ field }) => (
                            <Select
                                {...field}
                                value={field.value ?? ""}
                                label="Área"
                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                            >
                                <MenuItem value="">Sin área</MenuItem>
                                {selectedHouse.areas?.map((a) => (
                                    <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>
            )}

        </AppDrawer>

    )
}