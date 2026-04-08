import { translations } from "./tranlations";

export interface House {
  id: number;
  name: string;
  description: string;
  isPredefined?: boolean;
}

export interface Device {
  id: number;
  code: string;
  description?: string;
  houseId: number;
  addedAt: string;
}

const t = (key: keyof typeof translations) => translations[key];

export const PREDEFINED_HOUSES: House[] = [
  {
    id: 1,
    name: t("houseMain"),
    description: t("houseMainDesc"),
    isPredefined: true,
  },
  {
    id: 2,
    name: t("houseOffice"),
    description: t("houseOfficeDesc"),
    isPredefined: true,
  },
  {
    id: 3,
    name: t("houseCountry"),
    description: t("houseCountryDesc"),
    isPredefined: true,
  },
];

export function getHouseNameById(houses: House[], id: number): string {
  return houses.find((h) => h.id === id)?.name ?? "Desconocida";
}
