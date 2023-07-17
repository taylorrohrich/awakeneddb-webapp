import { CardType } from "../cardType";
import { Rarity } from "../rarity";

export interface CardListGetRequest {
  rarity?: Rarity;
  cost?: number;
  type?: CardType;
}

export interface CardGetRequest {
  cardId: number;
}
