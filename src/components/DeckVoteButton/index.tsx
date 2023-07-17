"use client";

import { useAddVote, useRemoveVote } from "@/services/client/deck";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Tooltip } from "../Tooltip";

interface Props {
  userVote: boolean;
  deckId: number;
}
export function DeckVoteButton({ userVote, deckId }: Props) {
  const addVote = useAddVote();
  const removeVote = useRemoveVote();
  const router = useRouter();
  const { user } = useUser();

  const toggleVote = useCallback(async () => {
    if (!user) return;
    const fn = userVote ? removeVote : addVote;
    await fn(deckId);
    router.refresh();
  }, [addVote, deckId, removeVote, router, user, userVote]);

  return (
    <Tooltip title={user ? undefined : "Sign in to vote"}>
      <button
        onClick={toggleVote}
        disabled={!user}
        className={twMerge(
          user ? "hover:text-red-600" : "cursor-not-allowed",
          userVote ? "text-red-600" : "text-gray-400"
        )}
      >
        <FontAwesomeIcon icon={faHeart} className={"w-4"} />
      </button>
    </Tooltip>
  );
}
