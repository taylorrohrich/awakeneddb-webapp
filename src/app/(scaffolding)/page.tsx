import { getDeckList } from "@/services/server/deck";
import { SearchParams } from "@/types/searchParams";
import { DeckSearch } from "@/components/DeckSearch";
import { getTagList } from "@/services/server/tag";
import { ROUTES } from "@/constants/routes";
import { LinkButton } from "@/components/LinkButton";
import { PaginatedDecks } from "@/components/PaginatedDecks";

export const metadata = {
  title: "Home | Awakened DB",
  description: "Popular Harry Potter: Magic Awakened Decks",
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
    <div className="p-6 flex flex-col items-center max-w-screen-xl mx-auto flex-1 h-full">
      <div className="p-6">
        <DeckSearch {...result} tags={tags} key={searchKey} />
      </div>
      <PaginatedDecks
        {...result}
        noResultsComponent={
          <>
            <div className="text-lg font-semibold">No results found</div>
            <LinkButton href={ROUTES.home}>Reset your search</LinkButton>
          </>
        }
      />
    </div>
  );
}
