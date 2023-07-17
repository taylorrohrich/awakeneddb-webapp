import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";

export async function POST(
  _: Request,
  { params: { deckId } }: { params: { deckId: string } }
) {
  return serverFetch(API_ROUTES.deckVotePost(Number(deckId)), {
    type: "raw",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
  });
}

export async function DELETE(
  _: Request,
  { params: { deckId } }: { params: { deckId: string } }
) {
  return serverFetch(API_ROUTES.deckVoteDelete(Number(deckId)), {
    type: "raw",
    init: {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    },
  });
}
