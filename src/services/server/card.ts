import { CARDS } from "@/data/cards";

import { CardGetRequest } from "@/types/api/card";

export async function getCardList() {
  return CARDS;
}

export async function getCard({ cardId }: CardGetRequest) {
  return CARDS.find((c) => c.id == cardId);
}
