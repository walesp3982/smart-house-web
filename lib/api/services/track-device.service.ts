"use server";

import { apiClient } from "@/lib/api/client";

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
  return await apiClient.GET("/track_devices/user", {});
}
