import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";

export async function POST(request: Request) {
  const body = await request.text();
  return serverFetch(API_ROUTES.deckPost, {
    type: "raw",
    init: {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    },
  });
}
