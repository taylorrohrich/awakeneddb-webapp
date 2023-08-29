import { ROUTES } from "@/constants/routes";
import { DeckMetadata } from "@/types/deckMetadata";
import Link from "next/link";
import { DeckVoteButton } from "@/components/DeckVoteButton";
import { timeAgo } from "@/helpers/date";

interface Props {
  deck: DeckMetadata;
}

export function DeckFooter({ deck }: Props) {
  return (
    <div className="flex items-center gap-2">
      {/* <div className="flex gap-1 items-center">
        <DeckVoteButton userVote={deck.userVote} deckId={deck.id} />
        {deck.score}
      </div>
      <div className="text-slate-300 font-bold">•</div> */}
      <span>
        by <span className="font-semibold">{deck.authorNickname}</span>
      </span>
      <div className="text-slate-300 font-bold">•</div>
      <div>{timeAgo(deck.createdAt)}</div>
    </div>
  );
}
