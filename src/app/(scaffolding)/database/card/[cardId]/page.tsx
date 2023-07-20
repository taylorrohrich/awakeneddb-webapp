import { Card } from "@/components/Card";
import { getCardAggregateType } from "@/helpers/getCardAggregateType";
import { getCard } from "@/services/server/card";
import { notFound } from "next/navigation";
import { getRarityStyle } from "@/helpers/cva";
import { twMerge } from "tailwind-merge";
import { Markdown } from "@/components/Markdown";
import { getServerFile } from "@/helpers/getServerFile";
import { getFileName } from "@/helpers/getFileName";
import { ROUTES } from "@/constants/routes";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getResourcePath } from "@/helpers/getResourcePath";
import { SITE_NAME } from "@/constants/site";

interface Props {
  params: { cardId: string };
}

export async function generateMetadata({ params: { cardId } }: Props) {
  const card = await getCard({ cardId: Number(cardId) });
  const cardName = card ? card.name : "Card";

  return {
    title: `${cardName} | ${SITE_NAME}`,
  };
}

export default async function Page({ params: { cardId } }: Props) {
  const card = await getCard({ cardId: Number(cardId) });
  if (!card) {
    notFound();
  }

  const { name, cost, rarityName, types } = card;
  const aggregateType = getCardAggregateType(types.map(({ name }) => name));
  const rarityText = getRarityStyle({ text: rarityName });
  const rarityBorder = getRarityStyle({ border: rarityName });
  const fileName = getFileName(name);
  const type = getCardAggregateType(types.map(({ name }) => name));
  const markdown = await getServerFile(
    `public/${getResourcePath(fileName, type, "markdown")}`
  );

  return (
    <div className="p-6 w-full">
      <Breadcrumbs
        crumbs={[{ href: ROUTES.cards, title: "Cards" }]}
        title={name}
      />
      <div className="flex gap-4 mt-6">
        <div className="shrink-0 hidden sm:block">
          <Card
            id={card.id}
            name={card.name}
            cost={cost}
            type={aggregateType}
            size="lg"
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className={twMerge("flex gap-3 pb-3 border-b-2", rarityBorder)}>
            <div className="shrink-0 sm:hidden">
              <Card
                id={card.id}
                name={card.name}
                cost={card.cost}
                type={aggregateType}
                size="md"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-4xl text-quill">{name}</h1>
              <div className={twMerge(rarityText, "font-bold text-3xl pb-1 ")}>
                {rarityName}
              </div>
            </div>
          </div>
          <Markdown markdown={markdown} className="p-2 prose-xl" />
        </div>
      </div>
    </div>
  );
}
