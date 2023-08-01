import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";
import { PostGetRequest, PostGetResponse } from "@/types/api/post";

export async function getPost({ postId }: PostGetRequest) {
  return serverFetch<PostGetResponse>(API_ROUTES.postGet(postId));
}

export async function getPostLatest() {
  return serverFetch<PostGetResponse>(API_ROUTES.postLatestGet);
}
