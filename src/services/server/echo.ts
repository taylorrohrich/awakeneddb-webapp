import { API_ROUTES } from "@/constants/routes";
import { serverFetch } from "@/helpers/serverFetch";
import { EchoGetRequest } from "@/types/api/echo";
import { Echo } from "@/types/echo";
import { EchoMetadata } from "@/types/echoMetadata";

export async function getEchoList() {
  const response = await serverFetch<EchoMetadata[]>(API_ROUTES.echoListGet);
  return response ?? [];
}

export async function getEcho({ echoId }: EchoGetRequest) {
  const response = await serverFetch<Echo>(API_ROUTES.echoGet(echoId));
  return response;
}
