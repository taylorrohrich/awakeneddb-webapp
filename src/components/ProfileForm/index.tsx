"use client";

import { User } from "@/types/user";
import { Button } from "../Button";
import { Input } from "../Input";
import { useProfileUpdate } from "@/services/client/profile";
import { useState } from "react";

interface Props {
  user: User;
}
export function ProfileForm({ user }: Props) {
  const [nickname, setNickname] = useState(user.nickname);
  const updateProfile = useProfileUpdate();
  return (
    <div className="flex items-end gap-4">
      <div>
        <label className="font-semibold text-lg" htmlFor="nickname">
          Nickname
        </label>
        <Input
          value={nickname}
          className="w-48"
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <Button onClick={() => updateProfile(nickname)}>Update</Button>
    </div>
  );
}
