import { ECHOES } from "@/data/echoes";
import { EchoGetRequest } from "@/types/api/echo";

export async function getEchoList() {
  return ECHOES;
}

export async function getEcho({ echoId }: EchoGetRequest) {
  return ECHOES.find((e) => e.id == echoId);
}
