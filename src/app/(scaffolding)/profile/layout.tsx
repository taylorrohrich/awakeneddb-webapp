import { PropsWithChildren } from "react";
import { SideNavigation } from "@/components/SideNavigation";
import { ROUTES } from "@/constants/routes";

const links = [
  {
    segment: "settings",
    title: "Settings",
    href: ROUTES.profileSettings,
  },
  {
    segment: "deck",
    title: "My Decks",
    href: ROUTES.profileDeck,
  },
];

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-full flex max-w-screen-xl mx-auto">
      <SideNavigation links={links} />
      {children}
    </div>
  );
}
