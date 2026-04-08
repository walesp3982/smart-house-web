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

interface UserProfile {
  name: string;
  email: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

interface DashboardContextType {
  customHouses: House[];
  setCustomHouses: React.Dispatch<React.SetStateAction<House[]>>;
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  snackbar: SnackbarState;
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>;
  showSnackbar: (message: string, severity: SnackbarState["severity"]) => void;
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
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity: SnackbarState["severity"]) =>
    setSnackbar({ open: true, message, severity });

  return (
    <DashboardContext.Provider
      value={{
        customHouses,
        setCustomHouses,
        devices,
        setDevices,
        userProfile,
        setUserProfile,
        snackbar,
        setSnackbar,
        showSnackbar,
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
