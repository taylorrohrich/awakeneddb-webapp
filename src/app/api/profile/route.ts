import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.text();
  const response = await serverFetch(API_ROUTES.profileUpdate, {
    type: "raw",
    init: {
      method: "PUT",
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
