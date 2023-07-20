import { Card } from "@/components/Card";
import { getCardAggregateType } from "@/helpers/getCardAggregateType";
import { getCardList } from "@/services/server/card";

import { SITE_NAME } from "@/constants/site";

export const metadata = {
  title: `Cards | ${SITE_NAME}`,
};

export default async function Page() {
  const cards = await getCardList();
  return (
    <div className="p-6 pt-12 grid gap-4 grid-cols-[repeat(auto-fill,80px)] w-full justify-center">
      {cards.map((card) => {
        const cardTypes = card.types.map(({ name }) => name);
        const type = getCardAggregateType(cardTypes);
        return (
          <Card
            key={card.id}
            withLink
            withTooltip
            withAnimation
            id={card.id}
            name={card.name}
            type={type}
          />
        );
      })}
    </div>
  );
}
