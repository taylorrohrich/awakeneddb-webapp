import { API_ROUTES } from "@/constants/routes";
import { DeckCodeGetRequest, DeckPostRequest } from "@/types/api/deck";
import { useCallback } from "react";

export function useAddVote() {
  const addVote = useCallback(async (deckId: number) => {
    return fetch(`/api${API_ROUTES.deckVotePost(deckId)}`, {
      method: "POST",
    });
  }, []);

  return addVote;
}

export function useRemoveVote() {
  const removeVote = useCallback(async (deckId: number) => {
    return fetch(`/api${API_ROUTES.deckVoteDelete(deckId)}`, {
      method: "DELETE",
    });
  }, []);

  return removeVote;
}

export function useAddDeck() {
  const addDeck = useCallback(async (body: DeckPostRequest) => {
    return fetch(`/api${API_ROUTES.deckPost}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }, []);

  return addDeck;
}
export function useUpdateDeck() {
  const updateDeck = useCallback(
    async (deckId: number, body: DeckPostRequest) => {
      return fetch(`/api${API_ROUTES.deckPut(deckId)}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
    },
    []
  );

  return updateDeck;
}

export function useDeleteDeck() {
  const updateDeck = useCallback(async (deckId: number) => {
    return fetch(`/api${API_ROUTES.deckDelete(deckId)}`, {
      method: "DELETE",
    });
  }, []);

  return updateDeck;
}

export function useGetDeckCode() {
  const updateDeck = useCallback(
    async (searchParamsObject: DeckCodeGetRequest) => {
      const searchParams = new URLSearchParams(
        Object.entries(searchParamsObject).map(([key, value]) => [
          key,
          String(value),
        ])
      );
      const response = await fetch(
        `/api${API_ROUTES.deckCodeGet}?${searchParams}`,
        {
          method: "GET",
        }
      );
      const body: { code: string } = await response.json();

      return body;
    },
    []
  );

  return updateDeck;
}
