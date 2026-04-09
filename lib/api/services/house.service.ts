"use server";

import { apiClient } from "@/lib/api/client";

export async function getAllHouses() {
  return await apiClient.GET("/houses", {});
}

export async function getHouseById(id: number) {
  return await apiClient.GET("/houses/{id}", {
    params: {
      path: { id },
    },
  });
}

interface CreateHouseRequest {
  name: string;
  location?: string | null | undefined;
  invitation_validation: boolean;
}

export async function createHouse(body: CreateHouseRequest) {
  return await apiClient.POST("/houses/", {
    body,
  });
}

interface UpdateHouseRequest {
  location: string | null;
  name: string | null;
}

export async function updateHouse(id: number, body: UpdateHouseRequest) {
  return await apiClient.PUT("/houses/{id}", {
    params: {
      path: { id },
    },
    body,
  });
}

export async function deleteHouse(id: number) {
  return await apiClient.DELETE("/houses/{id}", {
    params: {
      path: { id },
    },
  });
}
