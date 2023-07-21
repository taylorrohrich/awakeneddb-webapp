import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Deckbuilder } from "@/components/Deckbuilder";
import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { getResourceRecord } from "@/helpers/getResourceRecord";
import { getCardList } from "@/services/server/card";
import { getDeck } from "@/services/server/deck";
import { getEchoList } from "@/services/server/echo";
import { getTagList } from "@/services/server/tag";
import { notFound } from "next/navigation";
interface Props {
  params: {
    deckId: string;
  };
}

export async function generateMetadata({ params: { deckId } }: Props) {
  const deck = await getDeck({ deckId: Number(deckId) });
  const deckName = deck ? deck.name : "Deck";

  return {
    title: `${deckName} | ${SITE_NAME}`,
  };
}

export default async function Page({ params: { deckId } }: Props) {
  const cards = await getCardList();
  const echoes = await getEchoList();
  const tags = await getTagList();
  const deck = await getDeck({ deckId: Number(deckId) });
  if (!deck || !deck.isUserDeck) {
    notFound();
  }

  const resourceRecord = getResourceRecord(cards, echoes);
  const initialState = {
    echoId: deck.echoId,
    tagId: deck.tagId,
    name: deck.name,
    description: deck.description,
    companionCardIds: [
      deck.companionCardOne.id,
      deck.companionCardTwo.id,
      deck.companionCardThree.id,
    ],
    magicCardIds: [
      deck.magicCardOne.id,
      deck.magicCardTwo.id,
      deck.magicCardThree.id,
      deck.magicCardFour.id,
      deck.magicCardFive.id,
      deck.magicCardSix.id,
      deck.magicCardSeven.id,
      deck.magicCardEight.id,
    ],
  };
  return (
    <div className="p-6 flex-1 flex flex-col mx-auto gap-6">
      <Breadcrumbs
        crumbs={[{ title: "My Decks", href: ROUTES.profileDeck }]}
        title={deck.name}
      />
      <Deckbuilder
        deckId={deck.id}
        resourceRecord={resourceRecord}
        tags={tags}
        initialState={initialState}
      />
    </div>
  );
}
