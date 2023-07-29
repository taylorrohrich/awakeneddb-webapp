import { CardType } from "./cardType";

export interface ResourceRecord {
  echo: Record<string, { name: string }>;
  [CardType.MAGIC]: Record<string, { name: string; cost: number }>;
  [CardType.COMPANION]: Record<string, { name: string }>;
}
