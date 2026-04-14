"use server";

import { apiClient } from "@/lib/api/client";
import { components } from "@/lib/api/types"

export async function getAreasByHouse(houseId: number) {
  const { data, error, response } = await apiClient.GET("/houses/{house_id}/areas", {
    params: {
      path: { house_id: houseId },
    },
  });

  return { data, error, ok: response.ok, status: response.status }
}

export async function getAreaById(houseId: number, areaId: number) {
  return await apiClient.GET("/houses/{house_id}/areas/{area_id}", {
    params: {
      path: { house_id: houseId, area_id: areaId },
    },
  });
}

export type CreateAreaRequest = components["schemas"]["CreateAreaRequest"]
export async function createArea(houseId: number, body: CreateAreaRequest) {
  const { data, error, response } = await apiClient.POST("/houses/{house_id}/areas", {
    params: {
      path: { house_id: houseId },
    },
    body,
  });

  return { data, error, ok: response.ok, status: response.status }
}

export async function deleteArea(houseId: number, areaId: number) {
  const { data, error, response } = await apiClient.DELETE("/houses/{house_id}/areas/{area_id}", {
    params: {
      path: { house_id: houseId, area_id: areaId },
    },
  });
  return { data, error, ok: response.ok, status: response.status }
}

export type UpdateAreaRequest = components["schemas"]["UpdateAreaRequest"]
export async function patchArea(houseId: number, areaId: number, body: UpdateAreaRequest) {
  const { data, error, response } = await apiClient.PATCH("/houses/{house_id}/areas/{area_id}", {
    params: {
      path: { house_id: houseId, area_id: areaId },
    },
    body,
  });

  return { data, error, ok: response.ok, status: response.status }
}
