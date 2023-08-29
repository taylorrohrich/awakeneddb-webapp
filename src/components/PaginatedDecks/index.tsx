/* eslint-disable @typescript-eslint/no-unused-vars */

import { DeckMetadata } from "@/types/deckMetadata";
import { PaginationNavigation } from "../PaginationNavigation";
import { Deck } from "../Deck";

interface Props {
  data: DeckMetadata[];
  total: number;
  limit: number;
  page: number;
  noResultsComponent?: React.ReactNode;
}
export function PaginatedDecks({
  data,
  noResultsComponent,
  ...paginationParams
}: Props) {
  return (
    <>
      {/* <PaginationNavigation {...paginationParams} /> */}
      <div className="flex flex-col divide-y w-full">
        {data.map((deck) => (
          <Deck
            key={deck.id}
            deck={deck}
            withHeader
            withFooter
            className="p-6"
          />
        ))}
      </div>
      {!data.length && (
        <div className="flex flex-col flex-1 mt-6 items-center gap-3">
          {noResultsComponent ? (
            noResultsComponent
          ) : (
            <div className="text-lg font-semibold">No Decks Found</div>
          )}
        </div>
      )}
      {/* <PaginationNavigation {...paginationParams} /> */}
    </>
  );
}
