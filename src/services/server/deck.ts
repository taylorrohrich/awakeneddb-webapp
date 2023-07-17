import { EMPTY_PAGINATION_RESPONSE } from "@/constants/pagination";
import { API_ROUTES } from "@/constants/routes";
import { parsePaginationParams } from "@/helpers/parsePaginationParams";
import { serverFetch } from "@/helpers/serverFetch";
import {
  DeckGetRequest,
  DeckListGetRequest,
  DeckListGetResponse,
} from "@/types/api/deck";
import { Deck } from "@/types/deck";
import { isNil, omitBy } from "lodash";

export async function getDeckList({
  page,
  limit,
  ...otherParams
}: DeckListGetRequest): Promise<DeckListGetResponse> {
  const [parsedPage, parsedLimit] = parsePaginationParams(page, limit);
  const definedParams = omitBy(otherParams, isNil);
  const searchParams = new URLSearchParams({
    ...definedParams,
    page: parsedPage,
    limit: parsedLimit,
  });

  const response = await serverFetch<DeckListGetResponse>(
    `${API_ROUTES.deckListGet}?${searchParams}`
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
  return serverFetch<Deck>(API_ROUTES.deckGet(deckId));
}
