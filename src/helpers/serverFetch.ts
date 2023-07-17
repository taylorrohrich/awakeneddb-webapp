import { getSession } from "@auth0/nextjs-auth0";

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
  const session = await getSession();
  const accessToken = session?.accessToken;
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
      throw new Error(`${route}: ${result.status}`);
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
