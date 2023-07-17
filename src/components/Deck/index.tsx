import { DeckMetadata } from "@/types/deckMetadata";
import { DeckHeader } from "./DeckHeader";
import { DeckFooter } from "./DeckFooter";
import { twMerge } from "tailwind-merge";
import { DeckBody } from "./DeckBody";

interface Props {
  deck: DeckMetadata;
  withHeader?: boolean;
  withFooter?: boolean;
  className?: string;
}

export function Deck({ deck, withHeader, withFooter, className }: Props) {
  const magicCards = [
    deck.magicCardOne,
    deck.magicCardTwo,
    deck.magicCardThree,
    deck.magicCardFour,
    deck.magicCardFive,
    deck.magicCardSix,
    deck.magicCardSeven,
    deck.magicCardEight,
  ];

  const companionCards = [
    deck.companionCardOne,
    deck.companionCardTwo,
    deck.companionCardThree,
  ];
  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      {withHeader && <DeckHeader deck={deck} />}
      <DeckBody magicCards={magicCards} companionCards={companionCards} />
      {withFooter && <DeckFooter deck={deck} />}
    </div>
  );
}
