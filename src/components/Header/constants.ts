import { ROUTES } from "@/constants/routes";

export const NAV_LINKS = [
  { href: ROUTES.home, label: "Tier List", re: "^/$" },
  {
    href: ROUTES.deckBuilder,
    label: "Deck Builder",
    re: "^/deck/builder$",
  },
  { href: ROUTES.decks, label: "Search Decks", re: "^/deck$" },
  { href: ROUTES.cards, label: "Database", re: "^/database" },
];
