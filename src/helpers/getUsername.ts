import { House } from "@/types/house";

export function getUsername(house: House, nickname?: string) {
  return nickname ?? `Anonymous ${house}`;
}
