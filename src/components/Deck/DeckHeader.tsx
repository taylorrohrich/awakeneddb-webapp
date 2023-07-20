import { Echo } from "@/components/Echo";
import { ROUTES } from "@/constants/routes";
import { DeckMetadata } from "@/types/deckMetadata";
import Link from "next/link";
import { Tag } from "@/components/Tag";
import { Cost } from "../Cost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface Props {
  deck: DeckMetadata;
}

export function DeckHeader({ deck }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Echo
        name={deck.echoName}
        id={deck.echoId}
        size="sm"
        withLink
        withTooltip
      />
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2 justify-between">
          <Link className="font-semibold text-xl" href={ROUTES.deck(deck.id)}>
            {deck.name}
          </Link>
          {deck.isUserDeck && (
            <Link
              className="font-semibold text-lg flex items-center gap-1"
              href={ROUTES.profileDeckEdit(deck.id)}
            >
              <div> Edit</div>
              <FontAwesomeIcon icon={faEdit} className="text-base" />
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          {deck.avgCost && (
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-700 text-white">
              <div className="font-bold">{deck.avgCost.toFixed(1)}</div>
              <Cost size="sm" />
            </div>
          )}
          <Tag title={deck.tagName} category={deck.categoryName} />
        </div>
      </div>
    </div>
  );
}
