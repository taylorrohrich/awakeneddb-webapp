import { House } from "./house";

export interface User {
  id: number;
  createdAt: string;
  nickname?: string;
  house: House;
  score: number;
  deckCount: number;
}
