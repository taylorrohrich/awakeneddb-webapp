import { CardType } from "@/types/cardType";

export function getCardAggregateType(cardTypes: CardType[]) {
  return cardTypes.includes(CardType.MAGIC)
    ? CardType.MAGIC
    : CardType.COMPANION;
}
