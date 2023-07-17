import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";
import { User } from "@/types/user";

export async function getProfile() {
  const response = await serverFetch<User>(API_ROUTES.profileGet);
  return response;
}
