"use server";

import { getAllHousesUser } from "@/actions/houses/houses.actions";
import { DashboardLayoutContent } from "./dashboard-layout-content";

import { getUserMe } from "@/actions/user.actions";
import { UserStoreInitializer } from "@/component/auth-initializer";
import { getInstalledDevicesUser } from "@/actions/installed-devices.actions";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const userData = await getUserMe();
  const houseData = await getAllHousesUser();
  const installedDevicesData = await getInstalledDevicesUser();

  return (
    <>
      {userData && houseData && installedDevicesData && (
        <UserStoreInitializer
          userData={userData}
          houseData={houseData}
          installedDeviceData={installedDevicesData}
        />
      )}

      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </>
  );
}
