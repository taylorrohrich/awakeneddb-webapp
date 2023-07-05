import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: "https://awakeneddb/api",
      scope: "openid profile email offline_access",
    },
  }),
  onError(req: Request, error: Error) {
    console.error(error);
  },
});
