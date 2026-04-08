"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface House {
  id: number;
  name: string;
  description: string;
  isPredefined?: boolean;
}

interface Device {
  id: number;
  code: string;
  description?: string;
  houseId: number;
  addedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

interface DashboardContextType {
  customHouses: House[];
  setCustomHouses: React.Dispatch<React.SetStateAction<House[]>>;
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [customHouses, setCustomHouses] = useState<House[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Admin",
    email: "admin@smarthome.com",
  });

  return (
    <DashboardContext.Provider
      value={{
        customHouses,
        setCustomHouses,
        devices,
        setDevices,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard debe ser usado dentro de DashboardProvider");
  }
  return context;
}
