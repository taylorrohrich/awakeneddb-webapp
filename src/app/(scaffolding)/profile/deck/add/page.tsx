import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Deckbuilder } from "@/components/Deckbuilder";
import { ROUTES } from "@/constants/routes";
import { getResourceRecord } from "@/helpers/getResourceRecord";
import { getCardList } from "@/services/server/card";
import { getEchoList } from "@/services/server/echo";
import { getTagList } from "@/services/server/tag";

import { SITE_NAME } from "@/constants/site";
import { SearchParams } from "@/types/searchParams";
import { isNil, omitBy } from "lodash";

export const metadata = {
  title: `Add Deck | ${SITE_NAME}`,
};

interface Props {
  searchParams: SearchParams;
}
export default async function Page({ searchParams }: Props) {
  const cards = await getCardList();
  const echoes = await getEchoList();
  const tags = await getTagList();
  const { echoId, magicIds, companionIds } = searchParams;
  const initialState = omitBy(
    {
      echoId,
      magicCardIds: magicIds
        ? magicIds.split(",").map((id) => Number(id))
        : undefined,
      companionCardIds: companionIds
        ? companionIds.split(",").map((id) => Number(id))
        : undefined,
    },
    isNil
  );

  const resourceRecord = getResourceRecord(cards, echoes);
  return (
    <div className="p-6 flex-1 flex flex-col mx-auto gap-6">
      <Breadcrumbs
        crumbs={[{ title: "My Decks", href: ROUTES.profileDeck }]}
        title="Add Deck"
      />
      <Deckbuilder
        resourceRecord={resourceRecord}
        tags={tags}
        mode="user"
        initialState={
          Object.keys(initialState).length ? initialState : undefined
        }
      />
    </div>
  );
}
