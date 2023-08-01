import { SITE_NAME } from "@/constants/site";
import { getPostLatest } from "@/services/server/post";
import { notFound } from "next/navigation";
import { sortBy } from "lodash";
import { Deck } from "@/components/Deck";
import dayjs from "dayjs";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: `Tier List | ${SITE_NAME}`,
};

export default async function Page() {
  const result = await getPostLatest();
  if (!result) {
    notFound();
  }

  const sortedDecks = sortBy(result.data, "tierName");

  return (
    <div className="p-6 max-w-screen-xl mx-auto flex-1 h-full">
      <div className="flex items-center justify-between mb-4  border-b-2 border-mythic p-2">
        <div>
          <h1 className="text-3xl font-bold ">{result.name}</h1>
          <div>{dayjs(result.createdAt).format("MMM YYYY")}</div>
        </div>
        <Link
          href={ROUTES.decks}
          className="flex gap-2 items-center text-lg font-semibold"
        >
          <div>All Decks</div>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <div className="flex flex-col divide-y w-full">
        {sortedDecks.map((deck) => (
          <Deck
            key={deck.id}
            deck={deck}
            withHeader
            withFooter
            className="p-6"
          />
        ))}
      </div>
    </div>
  );
}
