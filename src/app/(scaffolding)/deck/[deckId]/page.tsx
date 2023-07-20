import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Deck } from "@/components/Deck";
import { Markdown } from "@/components/Markdown";
import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { getDeck } from "@/services/server/deck";
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
  const deck = await getDeck({ deckId: Number(deckId) });
  if (!deck) {
    notFound();
  }
  const { description, name } = deck;
  return (
    <div className="p-6 max-w-screen-xl mx-auto flex flex-col gap-2">
      <Breadcrumbs
        crumbs={[{ href: ROUTES.home, title: "Home" }]}
        title={name}
      />
      <div className="flex flex-col items-center">
        <Deck
          withHeader
          withFooter
          deck={deck}
          className="border-b-2 border-quill p-6"
        />
        <Markdown
          markdown={description ?? "No Description provided."}
          className="max-w-none self-stretch p-6"
        />
      </div>
    </div>
  );
}
