import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Deckbuilder } from "@/components/Deckbuilder";
import { ROUTES } from "@/constants/routes";
import { getResourceRecord } from "@/helpers/getResourceRecord";
import { getCardList } from "@/services/server/card";
import { getEchoList } from "@/services/server/echo";
import { getTagList } from "@/services/server/tag";

import { SITE_NAME } from "@/constants/site";

export const metadata = {
  title: `Deck Builder | ${SITE_NAME}`,
};

export default async function Page() {
  const cards = await getCardList();
  const echoes = await getEchoList();
  const tags = await getTagList();
  const resourceRecord = getResourceRecord(cards, echoes);
  return (
    <div className="h-full max-w-screen-xl p-6 flex-1 flex flex-col mx-auto gap-6">
      <Breadcrumbs
        crumbs={[{ title: "Home", href: ROUTES.home }]}
        title="Deck Builder"
      />
      <div className="mx-auto">
        <Deckbuilder
          resourceRecord={resourceRecord}
          tags={tags}
          mode="deckbuilder"
        />
      </div>
    </div>
  );
}
