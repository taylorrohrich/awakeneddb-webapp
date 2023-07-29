import { getCardList } from "@/services/server/card";

import { SITE_NAME } from "@/constants/site";
import { CardSearch } from "@/components/CardSearch";

export const metadata = {
  title: `Cards | ${SITE_NAME}`,
};

export default async function Page() {
  const cards = await getCardList();
  return (
    <div className="p-6 w-full flex flex-col gap-6">
      <CardSearch cards={cards} />
    </div>
  );
}
