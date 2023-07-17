import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PaginatedDecks } from "@/components/PaginatedDecks";
import { ROUTES } from "@/constants/routes";
import { getUsername } from "@/helpers/getUsername";
import { getUserDeckList } from "@/services/server/deck";
import { getUser } from "@/services/server/user";
import { SearchParams } from "@/types/searchParams";
import { notFound } from "next/navigation";

export default async function Page({
  params: { userId },
  searchParams,
}: {
  params: { userId: string };
  searchParams: SearchParams;
}) {
  const { page, limit } = searchParams;

  const result = await getUserDeckList({ userId: Number(userId), page, limit });
  const user = await getUser({ userId: Number(userId) });
  if (!user) {
    notFound();
  }
  const username = getUsername(user.house, user.nickname);

  return (
    <div className="p-6 flex flex-col max-w-screen-xl mx-auto">
      <Breadcrumbs
        crumbs={[{ href: ROUTES.home, title: "Home" }]}
        title={username}
      />
      <div className="border-b-2 pb-3 my-6">
        <h1 className="font-bold text-4xl mb-1">{username}</h1>
        <div className="flex items-center gap-2">
          <div className="font-semibold">{user.score} Likes</div>
          <div className="text-slate-300 font-bold">•</div>
          <div className="font-semibold">{user.deckCount} Decks</div>
        </div>
      </div>
      <PaginatedDecks {...result} />
    </div>
  );
}
