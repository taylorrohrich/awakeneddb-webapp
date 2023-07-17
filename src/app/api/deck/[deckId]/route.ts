import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";

export async function PUT(
  request: Request,
  { params: { deckId } }: { params: { deckId: string } }
) {
  const body = await request.text();
  return serverFetch(API_ROUTES.deckPut(Number(deckId)), {
    type: "raw",
    init: {
      method: "PUT",
      body,
      headers: { "Content-Type": "application/json" },
    },
  });
}
