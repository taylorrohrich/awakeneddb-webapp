import { useCallback } from "react";

export const useClientFetch = () => {
  const clientFetch = useCallback((route: string, options?: RequestInit) => {
    return fetch(`/api${route}`, options);
  }, []);

  return clientFetch;
};
