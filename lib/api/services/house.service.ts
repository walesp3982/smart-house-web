"use server";

import { apiClient } from "@/lib/api/client";

export async function getAllHousesWithArea() {
  const { data, error, response } = await apiClient.GET("/houses/with-areas", {
    params: {
    }
  })

  return { data, error, ok: response.ok, status: response.status }
}

export async function getHouseById(id: number) {
  const { data, error, response } = await apiClient.GET("/houses/{id}", {
    params: {
      path: { id },
    },
  });

  return { data, error, ok: response.ok, status: response.status }
}

interface CreateHouseRequest {
  name: string;
  location?: string | null | undefined;
  invitation_validation: boolean;
}

export async function createHouse(body: CreateHouseRequest) {
  const { data, error, response } = await apiClient.POST("/houses/", {
    body,
  });

  return { data, error, ok: response.ok, status: response.status }
}

interface UpdateHouseRequest {
  location: string | null;
  name: string | null;
}

export async function updateHouse(id: number, body: UpdateHouseRequest) {
  const { data, error, response } = await apiClient.PUT("/houses/{id}", {
    params: {
      path: { id },
    },
    body,
  });

  return { data, error, ok: response.ok, status: response.status }
}

export async function deleteHouse(id: number) {
  return await apiClient.DELETE("/houses/{id}", {
    params: {
      path: { id },
    },
  });
}
