import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const response = await serverFetch(
    `${API_ROUTES.deckCodeGet}?${searchParams}`,
    {
      type: "raw",
      init: {
        method: "GET",
      },
    }
  );
  if (!response) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  return response;
}
