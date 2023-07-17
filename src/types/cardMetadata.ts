import { CardType } from "./cardType";
import { Rarity } from "./rarity";

export interface CardMetadata {
  id: number;
  name: string;
  cost?: number;
  rarityId: number;
  rarityName: Rarity;
  types: { id: number; name: CardType }[];
}
