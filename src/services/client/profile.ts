import { API_ROUTES } from "@/constants/routes";
import { useCallback } from "react";

export function useProfileUpdate() {
  const profileUpdate = useCallback(async (nickname: string) => {
    return fetch(`/api${API_ROUTES.profileUpdate}`, {
      method: "PUT",
      body: JSON.stringify({ nickname }),
    });
  }, []);

  return profileUpdate;
}
