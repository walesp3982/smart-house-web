"use server";

import { apiClient } from "@/lib/api/client";

export async function getAreasByHouse(houseId: number) {
  return await apiClient.GET("/houses/{house_id}/areas", {
    params: {
      path: { house_id: houseId },
    },
  });
}

export async function getAreaById(houseId: number, areaId: number) {
  return await apiClient.GET("/houses/{house_id}/areas/{area_id}", {
    params: {
      path: { house_id: houseId, area_id: areaId },
    },
  });
}

interface CreateAreaRequest {
  name: string;
  type: "living_room" | "bedroom" | "kitchen" | "outside";
}
export async function createArea(houseId: number, body: CreateAreaRequest) {
  return await apiClient.POST("/houses/{house_id}/areas", {
    params: {
      path: { house_id: houseId },
    },
    body,
  });
}

export async function deleteArea(houseId: number, areaId: number) {
  return await apiClient.DELETE("/houses/{house_id}/areas/{area_id}", {
    params: {
      path: { house_id: houseId, area_id: areaId },
    },
  });
}

export async function patchArea(houseId: number, areaId: number, body: object) {
  return await apiClient.PATCH("/houses/{house_id}/areas/{area_id}", {
    params: {
      path: { house_id: houseId, area_id: areaId },
    },
    body,
  });
}
