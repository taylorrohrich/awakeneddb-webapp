import { CardType } from "./cardType";

export interface ResourceRecord {
  echo: Record<string, string>;
  [CardType.MAGIC]: Record<string, string>;
  [CardType.COMPANION]: Record<string, string>;
}
