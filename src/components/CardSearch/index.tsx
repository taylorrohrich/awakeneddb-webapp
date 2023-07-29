"use client";

import { CardMetadata } from "@/types/cardMetadata";
import { Card } from "../Card";
import { getCardAggregateType } from "@/helpers/getCardAggregateType";
import { useMemo, useState } from "react";
import { Input } from "../Input";
import { CardType } from "@/types/cardType";
import { orderBy } from "lodash";

interface Props {
  cards: CardMetadata[];
}

export function CardSearch({ cards }: Props) {
  const [searchText, setSearchText] = useState("");
  const filteredCards = useMemo((): (CardMetadata & {
    type: CardType.MAGIC | CardType.COMPANION;
  })[] => {
    const searchTextLower = searchText.toLowerCase();
    const cardSubset = searchText
      ? cards.filter(({ name }) => name.toLowerCase().includes(searchTextLower))
      : cards;

    return orderBy(
      cardSubset.map((card) => {
        const cardTypes = card.types.map(({ name }) => name);
        const type = getCardAggregateType(cardTypes);
        return { ...card, type };
      }),
      "cost"
    );
  }, [cards, searchText]);
  return (
    <>
      <div>
        <h2 className="font-bold text-2xl text-quill capitalize mb-1">Cards</h2>
        <Input
          className="w-48 self-center"
          aria-label={`Search for card`}
          placeholder={`Search for card`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,80px)] justify-center">
        {filteredCards.map((card) => {
          return (
            <Card
              cost={card.cost}
              key={card.id}
              withLink
              withTooltip
              withAnimation
              id={card.id}
              name={card.name}
              type={card.type}
            />
          );
        })}
      </div>
    </>
  );
}
