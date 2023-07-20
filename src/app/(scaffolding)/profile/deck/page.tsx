import { LinkButton } from "@/components/LinkButton";
import { PaginatedDecks } from "@/components/PaginatedDecks";
import { ROUTES } from "@/constants/routes";
import { getProfileDeckList } from "@/services/server/deck";
import { SearchParams } from "@/types/searchParams";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SITE_NAME } from "@/constants/site";

export const metadata = {
  title: `My Decks | ${SITE_NAME}`,
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, limit } = searchParams;

  const result = await getProfileDeckList({ page, limit });
  return (
    <div className="p-6 mx-auto flex flex-col gap-6 flex-1">
      <div className="flex items-center justify-between border-b-2 pb-3">
        <h1 className="font-bold text-4xl">My Decks</h1>
        <LinkButton
          className="flex items-center gap-1"
          href={ROUTES.profileDeckAdd}
        >
          <FontAwesomeIcon icon={faPlus} className="text-base text-white" />
          Add Deck
        </LinkButton>
      </div>
      <PaginatedDecks {...result} />
    </div>
  );
}
