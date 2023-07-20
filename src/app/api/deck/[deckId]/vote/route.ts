import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";
import { NextResponse } from "next/server";

export async function POST(
  _: Request,
  { params: { deckId } }: { params: { deckId: string } }
) {
  const response = await serverFetch(API_ROUTES.deckVotePost(Number(deckId)), {
    type: "raw",
    init: {
      method: "POST",
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

export async function DELETE(
  _: Request,
  { params: { deckId } }: { params: { deckId: string } }
) {
  const response = await serverFetch(
    API_ROUTES.deckVoteDelete(Number(deckId)),
    {
      type: "raw",
      init: {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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
