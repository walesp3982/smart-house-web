"use server";

import { getAllHousesUser } from "@/actions/houses/houses.actions";
import { DashboardLayoutContent } from "./dashboard-layout-content"

import { getUserMe } from "@/actions/user.actions";
import { UserStoreInitializer } from "@/component/auth-initializer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}


export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const userData = await getUserMe()
  const houseData = await getAllHousesUser()
  return (
    <>
      {userData && houseData && <UserStoreInitializer userData={userData} houseData={houseData} />}

      <DashboardLayoutContent>

        {children}</DashboardLayoutContent>
    </>);
}
