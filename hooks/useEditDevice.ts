import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useHouseStore } from "@/store/house-store";
import { InstalledDeviceType, useInstalledDevicesStore } from "@/store/installed-devices-store";

const editDeviceSchema = z.object({
    name: z.string().min(1, "Requerido"),
    house_id: z.number().nullable(),
    area_id: z.number().nullable(),
});

type EditDeviceForm = z.infer<typeof editDeviceSchema>;

export function useEditDevice(device: InstalledDeviceType | null, onClose: () => void) {
    const houses = useHouseStore((state) => state.house);

    const form = useForm<EditDeviceForm>({
        resolver: zodResolver(editDeviceSchema),
        values: {
            name: device?.name ?? "",
            house_id: device?.house_id ?? null,
            area_id: device?.area_id ?? null,
        },
    });

    const selectedHouseId = form.watch("house_id");
    const selectedHouse = houses?.find((h) => h.id === selectedHouseId);

    // cuando cambia la casa, resetea el área
    const handleHouseChange = (houseId: number | null) => {
        form.setValue("house_id", houseId);
        form.setValue("area_id", null);
    };

    const onSubmit = async (data: EditDeviceForm) => {
        // llamada a tu API: PATCH /devices/{device.id}
        // luego actualiza el store local
        useInstalledDevicesStore.setState((prev) => ({
            installedDevices: prev.installedDevices?.map((d) =>
                d.id === device?.id ? { ...d, ...data } : d
            ),
        }));
        onClose();
    };

    return { form, selectedHouse, handleHouseChange, onSubmit };
}