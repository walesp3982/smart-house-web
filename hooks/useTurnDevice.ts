import { sendInstalledDeviceCommand } from "@/lib/api/services/installed-device.service";
import {useState} from "react";
import { toast } from "sonner";

export function useTurnDevice(deviceId: number, type_device: string, last_status?: "on" | "off") {
    const [loading, setLoading] = useState(false);

    const turnDevice = async () => {
        setLoading(true);
        try {
            if (last_status === undefined) {
                console.warn("Estado del dispositivo desconocido. No se puede ejecutar la acción.");
                toast.error("Estado del dispositivo desconocido. No se puede ejecutar la acción.");
                return;
            }
            if ( type_device !== "door" && type_device !== "light" && type_device !== "movement" && type_device !== "temperature" && type_device !== "camera") {
                console.error("Tipo de dispositivo no válido.");
                toast.error("Tipo de dispositivo no válido.");
                return;
            }
            const response = await sendInstalledDeviceCommand(deviceId, {
                action: last_status === "on" ? "off" : "on",
                type: type_device,
            });

            if (response.ok) {
                console.log("Comando enviado exitosamente");
            }
        } catch (error) {
            console.error("Error turning device:", error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, turnDevice };
}