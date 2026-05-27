"use server";

import { apiClient } from "@/lib/api/client";
import { components } from "@/lib/api/types";

export type TrackDeviceType = components["schemas"]["TrackDeviceResponse"];

export async function getTrackByDeviceId(deviceId: number) {
  return await apiClient.GET("/track_devices/device/{device_id}", {
    params: {
      path: { device_id: deviceId },
    },
  });
}

export async function getTrackByHouseId(houseId: number) {
  return await apiClient.GET("/track_devices/house/{house_id}", {
    params: {
      path: { house_id: houseId },
    },
  });
}

export async function getTrackByUserId() {
  const { data, error, response } = await apiClient.GET(
    "/track_devices/user",
    {},
  );
  return { data, error, ok: response.ok, status: response.status };
}
