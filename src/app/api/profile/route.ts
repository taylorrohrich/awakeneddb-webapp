import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";

export async function PUT(request: Request) {
  const body = await request.text();
  console.log(body);
  return serverFetch(API_ROUTES.profileUpdate, {
    type: "raw",
    init: {
      method: "PUT",
      body,
      headers: { "Content-Type": "application/json" },
    },
  });
}
