import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";
import { User } from "@/types/user";

export async function getUser({ userId }: { userId: number }) {
  const response = await serverFetch<User>(API_ROUTES.userGet(userId));
  return response;
}
