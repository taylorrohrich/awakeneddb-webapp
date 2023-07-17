import { Duration } from "@/types/duration";
import { PaginatedResponse } from "../paginatedResponse";
import { DeckMetadata } from "../deckMetadata";

export interface DeckGetRequest {
  deckId: number;
}
export interface DeckListGetRequest {
  page?: string;
  limit?: string;
  duration?: string;
  costLow?: string;
  costHigh?: string;
  tagId?: string;
}
export interface DeckListGetResponse extends PaginatedResponse<DeckMetadata> {
  duration: Duration;
  costLow: number;
  costHigh: number;
  tagId?: number;
}

export interface DeckPostRequest {
  name: string;
  description: string;
  tagId: number;
  echoId: number;
  magicCardOneId: number;
  magicCardTwoId: number;
  magicCardThreeId: number;
  magicCardFourId: number;
  magicCardFiveId: number;
  magicCardSixId: number;
  magicCardSevenId: number;
  magicCardEightId: number;
  companionCardOneId: number;
  companionCardTwoId: number;
  companionCardThreeId: number;
}

export interface DeckPutRequest extends DeckPostRequest {
  id: number;
}

export interface DeckDeleteRequest {
  deckId: number;
}

export interface DeckCardPostRequest {
  deckId: number;
  cardId: number;
  position: number;
}

export interface DeckCardPutRequest {
  deckCardId: number;
  cardId: number;
}

export interface DeckCardDeleteRequest {
  deckCardId: number;
}

export interface DeckVotePostRequest {
  deckId: number;
  upvote: boolean;
}

export interface DeckVotePutRequest {
  voteId: number;
  upvote: boolean;
}

export interface DeckVoteDeleteRequest {
  voteId: number;
}
