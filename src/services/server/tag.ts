import { API_ROUTES } from "@/constants/routes";
import { TAGS } from "@/data/tags";
import { serverFetch } from "@/helpers/serverFetch";
import { TagGetRequest } from "@/types/api/tag";
import { Tag } from "@/types/tag";

export async function getTag({ tagId }: TagGetRequest) {
  return TAGS.filter((t) => t.id == tagId);
}

export async function getTagList() {
  return TAGS;
}
