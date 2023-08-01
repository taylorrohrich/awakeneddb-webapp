import { DeckMetadata } from "../deckMetadata";
import { Post } from "../post";

export interface PostGetRequest {
  postId: number;
}

export interface PostGetResponse extends Post {
  data: (DeckMetadata & { tierName: string })[];
}
