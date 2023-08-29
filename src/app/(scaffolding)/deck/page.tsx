/* eslint-disable @typescript-eslint/no-unused-vars */

import { getDeckList } from "@/services/server/deck";
import { SearchParams } from "@/types/searchParams";
import { DeckSearch } from "@/components/DeckSearch";
import { getTagList } from "@/services/server/tag";
import { ROUTES } from "@/constants/routes";
import { LinkButton } from "@/components/LinkButton";
import { PaginatedDecks } from "@/components/PaginatedDecks";
import { SITE_NAME } from "@/constants/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: `Decks | ${SITE_NAME}`,
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, limit, duration, tagId, costLow, costHigh } = searchParams;

  const selectedParams = { page, limit, duration, tagId, costLow, costHigh };
  const searchKey = JSON.stringify(selectedParams);

  const result = await getDeckList(selectedParams);
  const tags = await getTagList();

  return (
    <div className="p-6 flex flex-col max-w-screen-xl mx-auto flex-1 h-full">
      <div className="flex items-center justify-between mb-4  border-b-2 border-mythic p-2">
        <div>
          <h1 className="text-3xl font-bold ">Search Decks</h1>
        </div>
        <Link
          href={ROUTES.home}
          className="flex gap-2 items-center text-lg font-semibold"
        >
          <div>Tier List</div>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      {/* <div className="p-6">
        <DeckSearch {...result} tags={tags} key={searchKey} />
      </div> */}
      <PaginatedDecks
        {...result}
        noResultsComponent={
          <>
            <div className="text-lg font-semibold">No results found</div>
            <LinkButton href={ROUTES.decks}>Reset your search</LinkButton>
          </>
        }
      />
    </div>
  );
}
