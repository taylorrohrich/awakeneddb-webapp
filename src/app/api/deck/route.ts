import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const response = await serverFetch(API_ROUTES.deckPost, {
    type: "raw",
    init: {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    },
  });

  if (!response) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  return response;
}
