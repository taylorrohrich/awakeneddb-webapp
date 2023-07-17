import { ProfileCircle } from "@/components/ProfileCircle";
import { ProfileForm } from "@/components/ProfileForm";
import { getUsername } from "@/helpers/getUsername";
import { getProfile } from "@/services/server/profile";
import { notFound } from "next/navigation";

export default async function Page() {
  const user = await getProfile();
  if (!user) {
    notFound();
  }

  const username = getUsername(user.house, user.nickname);

  return (
    <div className="flex-1">
      <div className="border-b-2 pb-3 my-6">
        <div className="flex items-center gap-4">
          <ProfileCircle title={username} />
          <div>
            <h1 className="font-bold text-4xl mb-1">{username}</h1>
            <div className="flex items-center gap-2">
              <div className="font-semibold">{user.score} Likes</div>
              <div className="text-slate-300 font-bold">•</div>
              <div className="font-semibold">{user.deckCount} Decks</div>
            </div>
          </div>
        </div>
      </div>
      <ProfileForm user={user} />
    </div>
  );
}
