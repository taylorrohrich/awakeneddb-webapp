import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";
import { TagGetRequest } from "@/types/api/tag";
import { Tag } from "@/types/tag";

export async function getTag({ tagId }: TagGetRequest) {
  const response = await serverFetch<Tag>(API_ROUTES.tagGet(tagId));
  return response;
}

export async function getTagList() {
  const response = await serverFetch<Tag[]>(API_ROUTES.tagyListGet);
  return response ?? [];
}
