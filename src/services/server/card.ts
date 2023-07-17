import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";
import { CardGetRequest, CardListGetRequest } from "@/types/api/card";
import { Card } from "@/types/card";
import { CardMetadata } from "@/types/cardMetadata";
import { omitBy, isNil } from "lodash";

export async function getCardList(options: CardListGetRequest = {}) {
  const rawSearchParams = omitBy(options, isNil);
  const searchParams = new URLSearchParams(rawSearchParams);
  const response = await serverFetch<CardMetadata[]>(
    `${API_ROUTES.cardListGet}?${searchParams}`
  );
  return response ?? [];
}

export async function getCard({ cardId }: CardGetRequest) {
  const response = await serverFetch<Card>(API_ROUTES.cardGet(cardId));
  return response;
}
