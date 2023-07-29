import { ROUTES } from "@/constants/routes";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { ProfileCircle } from "@/components/ProfileCircle";
import Image from "next/image";
import { getProfile } from "@/services/server/profile";
import { getUsername } from "@/helpers/getUsername";
import { Menu } from "../Menu";
import { SITE_NAME } from "@/constants/site";
import { MobileMenuDropdown, MobileMenuIcon } from "./MobileMenu";
import { NAV_LINKS } from "./constants";

const PROFILE_LINKS = [
  { href: ROUTES.profileSettings, label: "Settings" },
  { href: ROUTES.profileDeck, label: "My Decks" },
  { href: ROUTES.logout, label: "Log Out", prefetch: false },
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
    <header className="font-semibold flex-shrink-0 text-lg sticky top-0 bg-white z-20 shadow-md">
      <nav className="flex items-center gap-6 h-16 px-4 sm:px-10 relative">
        <MobileMenuIcon />

        <Link
          href={ROUTES.home}
          className="flex items-center gap-6 shrink-0 absolute left-1/2 -translate-x-1/2 sm:static sm:left-0 sm:translate-x-0"
        >
          <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
          <span className="hidden sm:block">{SITE_NAME}</span>
        </Link>
        <div className="items-center gap-6  hidden sm:flex ml-auto">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div className="pl-6 border-l-2">
          {!user && (
            <Link href={ROUTES.login} prefetch={false}>
              Sign In
            </Link>
          )}
          {user && (
            <Menu links={PROFILE_LINKS}>
              <ProfileCircle title={username} className="hover:no-underline" />
            </Menu>
          )}
        </div>
      </nav>
      <MobileMenuDropdown />
    </header>
  );
}
