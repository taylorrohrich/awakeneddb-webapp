"use client";

import { User } from "@/types/user";
import { Button } from "../Button";
import { Input } from "../Input";
import { useProfileUpdate } from "@/services/client/profile";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  user: User;
}
export function ProfileForm({ user }: Props) {
  const [nickname, setNickname] = useState(user.nickname ?? "");
  const buttonDisabled = nickname === (user.nickname ?? "");
  const updateProfile = useProfileUpdate();
  const updateNickname = useCallback(async () => {
    try {
      const result = await updateProfile(nickname);
      if (result.ok) {
        toast.success("Profile updated");
      } else {
        const body = await result.json();
        if (body?.errors?.length === 1) {
          toast.error(body.errors[0]);
        } else {
          toast.error("Error updating profile");
        }
      }
    } catch {
      toast.error("Error updating profile");
    }
  }, [nickname, updateProfile]);
  return (
    <div className="flex items-end gap-4">
      <div>
        <label className="font-semibold text-lg" htmlFor="nickname">
          Nickname
        </label>
        <Input
          id="nickname"
          value={nickname}
          className="w-48"
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <Button onClick={updateNickname} disabled={buttonDisabled}>
        Update
      </Button>
    </div>
  );
}
