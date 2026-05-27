import {
  getTrackByUserId,
  TrackDeviceType,
} from "@/lib/api/services/track-device.service";
import { getErrorMessage } from "@/lib/api/utils/error";
import { toast } from "sonner";

export async function getTrackData(): Promise<TrackDeviceType[] | null> {
  const { data, error } = await getTrackByUserId();
  if (error) {
    toast.error(getErrorMessage(error.detail));
    return null;
  }
  if (!data) {
    toast.error("Error al conseguir el seguimiento de dispositivos");
    return null;
  }
  return data;
}
