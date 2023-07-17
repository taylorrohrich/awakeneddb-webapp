import { PropsWithChildren } from "react";
import { SideNavigation } from "@/components/SideNavigation";
import { ROUTES } from "@/constants/routes";

const links = [
  {
    segment: "card",
    title: "Cards",
    href: ROUTES.cards,
  },
  {
    segment: "echo",
    title: "Echoes",
    href: ROUTES.echoes,
  },
];

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-full flex items-start max-w-screen-xl mx-auto">
      <SideNavigation links={links} />
      {children}
    </div>
  );
}
