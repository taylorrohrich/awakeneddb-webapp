import { ROUTES } from "@/constants/routes";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

interface BaseOptions {
  init?: RequestInit;
}
interface RawOptions extends BaseOptions {
  type: "raw";
}
interface JsonOptions extends BaseOptions {
  type: "json";
}
export async function serverFetch(
  route: string,
  options: RawOptions
): Promise<Response | undefined>;
export async function serverFetch<T>(
  route: string,
  options?: JsonOptions
): Promise<T | undefined>;
export async function serverFetch<T>(
  route: string,
  options: RawOptions | JsonOptions = { type: "json", init: undefined }
) {
  let accessToken;
  const session = await getSession();
  if (session) {
    try {
      accessToken = (await getAccessToken()).accessToken;
    } catch {
      // If session but can't get access token, log out
      redirect(ROUTES.logout);
      return;
    }
  }

  const { type, init } = options;

  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;
  const fetchOptions = init ?? {};
  if (headers) {
    fetchOptions.headers = { ...fetchOptions.headers, ...headers };
  }
  try {
    const result = await fetch(
      `${process.env.API_BASE_URL}${route}`,
      fetchOptions
    );
    if (result.ok) {
      switch (type) {
        case "json":
          return result.json() as T;
        case "raw":
          return result;
      }
    } else {
      if (type === "raw") {
        return result;
      } else {
        throw new Error(`${route}: ${result.status}`);
      }
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
