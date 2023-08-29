import { EMPTY_PAGINATION_RESPONSE } from "@/constants/pagination";
import { API_ROUTES } from "@/constants/routes";
import { DECKS } from "@/data/decks";
import { parsePaginationParams } from "@/helpers/parsePaginationParams";
import { serverFetch } from "@/helpers/serverFetch";
import {
  DeckGetRequest,
  DeckListGetRequest,
  DeckListGetResponse,
} from "@/types/api/deck";

export async function getDeckList(): Promise<DeckListGetResponse> {
  return {
    duration: 7,
    costLow: 1,
    costHigh: 9,
    data: DECKS,
    page: 0,
    limit: 200,
    total: DECKS.length,
  };
}

export async function getProfileDeckList({
  page,
  limit,
}: DeckListGetRequest): Promise<DeckListGetResponse> {
  const [parsedPage, parsedLimit] = parsePaginationParams(page, limit);
  const searchParams = new URLSearchParams({
    page: parsedPage,
    limit: parsedLimit,
  });

  const response = await serverFetch<DeckListGetResponse>(
    `${API_ROUTES.deckProfileListGet}?${searchParams}`
  );
  return (
    response ?? {
      ...EMPTY_PAGINATION_RESPONSE,
      duration: 7,
      costLow: 1,
      costHigh: 9,
    }
  );
}

export async function getUserDeckList({
  userId,
  page,
  limit,
}: DeckListGetRequest & { userId: number }): Promise<DeckListGetResponse> {
  const [parsedPage, parsedLimit] = parsePaginationParams(page, limit);
  const searchParams = new URLSearchParams({
    page: parsedPage,
    limit: parsedLimit,
  });

  const response = await serverFetch<DeckListGetResponse>(
    `${API_ROUTES.deckUserListGet(userId)}?${searchParams}`
  );
  return (
    response ?? {
      ...EMPTY_PAGINATION_RESPONSE,
      duration: 7,
      costLow: 1,
      costHigh: 9,
    }
  );
}

export async function getDeck({ deckId }: DeckGetRequest) {
  return DECKS.find((d) => d.id == deckId);
}
