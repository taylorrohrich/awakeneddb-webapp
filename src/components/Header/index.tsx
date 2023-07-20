import { ROUTES } from "@/constants/routes";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { ProfileCircle } from "@/components/ProfileCircle";
import Image from "next/image";
import { getProfile } from "@/services/server/profile";
import { getUsername } from "@/helpers/getUsername";
import { Menu } from "../Menu";
import { Tooltip } from "../Tooltip";
import { SITE_NAME } from "@/constants/site";

const PROFILE_LINKS = [
  { href: ROUTES.profileSettings, label: "Settings" },
  { href: ROUTES.profileDeck, label: "My Decks" },
  { href: ROUTES.logout, label: "Log Out" },
];

export async function Header() {
  const session = await getSession();
  const user = session?.user;
  let username;
  if (user) {
    const profile = await getProfile();
    username = profile
      ? getUsername(profile.house, profile.nickname)
      : undefined;
  }

  return (
    <header className="flex gap-6 items-center px-10 font-semibold h-16 flex-shrink-0 text-lg sticky top-0 bg-white z-20 shadow-md">
      <nav className="flex-1 flex items-center gap-6">
        <Link href={ROUTES.home} className="flex items-center gap-6 shrink-0">
          <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
          <span className="hidden sm:block">{SITE_NAME}</span>
        </Link>
        <div className="flex items-center gap-6 ml-auto">
          <Link href={ROUTES.home}>Decks</Link>
          <Link href={ROUTES.cards}>Database</Link>
          {user ? (
            <Link href={ROUTES.profileDeckAdd}>Add Deck</Link>
          ) : (
            <Tooltip title="Sign in to create a deck" anchor="bottom">
              <div className="text-gray-400 cursor-not-allowed">Add Deck</div>
            </Tooltip>
          )}
        </div>
        <div className="pl-6 border-l-2">
          {!user && <Link href={ROUTES.login}>Sign In</Link>}
          {user && (
            <Menu links={PROFILE_LINKS}>
              <ProfileCircle title={username} className="hover:no-underline" />
            </Menu>
          )}
        </div>
      </nav>
    </header>
  );
}
