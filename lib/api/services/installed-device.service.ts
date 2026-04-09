"use server";

import { apiClient } from "@/lib/api/client";

export async function getInstalledDevices() {
  return await apiClient.GET("/installed_devices", {});
}

export async function getInstalledDevicesWithDevice() {
  const { data, error, response } = await apiClient.GET("/installed_devices/with-devices")
  return { data, error, ok: response.ok, status: response.status }
}

export async function getInstalledDeviceById(installedDeviceId: number) {
  return await apiClient.GET("/installed_devices/{installed_device_id}", {
    params: {
      path: { installed_device_id: installedDeviceId },
    },
  });
}

interface RegisterInstalledDeviceRequest {
  name: string;
  uuid: string;
  code_verification: string;
  house_id?: number | null | undefined;
  area_id?: number | null | undefined;
}

export async function registerInstalledDevice(
  body: RegisterInstalledDeviceRequest,
) {
  return await apiClient.POST("/installed_devices", {
    body,
  });
}

export async function updateInstalledDevice(
  installedDeviceId: number,
  body: object,
) {
  return await apiClient.PATCH("/installed_devices/{installed_device_id}", {
    params: {
      path: { installed_device_id: installedDeviceId },
    },
    body,
  });
}

export async function deleteInstalledDevice(installedDeviceId: number) {
  return await apiClient.DELETE("/installed_devices/{installed_device_id}", {
    params: {
      path: { installed_device_id: installedDeviceId },
    },
  });
}

type DeviceCommand =
  | { action: "on" | "off"; type: "door" }
  | { action: "on" | "off"; type: "light" }
  | { action: "on" | "off"; type: "movement" }
  | {
    action: "on" | "off";
    type: "temperature";
    enable_auto: boolean;
    has_limit: number;
  }
  | { action: "on" | "off"; type: "camera" };
export async function sendInstalledDeviceCommand(
  installedDeviceId: number,
  body: DeviceCommand,
) {
  return await apiClient.POST(
    "/installed_devices/{installed_device_id}/command",
    {
      params: {
        path: { installed_device_id: installedDeviceId }
      },
      body,
    },
  );
}
