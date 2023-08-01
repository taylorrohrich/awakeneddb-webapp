import { Category } from "@/types/category";
import { Tier } from "@/types/tier";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type Style = Category | Tier;
interface Props {
  title: string;
  style: Style;
}

const getTagStyle = cva("rounded px-2 py-1 text-white font-semibold", {
  variants: {
    style: {
      [Category.CLASSROOM]: "bg-parchment",
      [Category.DUEL]: "bg-duel",
      [Category.SOLO_EXPLORATION]: "bg-soloExploration",
      [Category.DEATHLY_DELL]: "bg-deathlyDell",
      [Category.HAUNTED_HOLLOW]: "bg-hauntedHollow",
      [Tier.TIER_1]: "bg-tierOne text-slate-800",
      [Tier.TIER_2]: "bg-tierTwo text-slate-800",
      [Tier.TIER_3]: "bg-tierThree text-slate-800",
    },
  },
});
export function Tag({ title, style }: Props) {
  return <div className={twMerge(getTagStyle({ style }))}>{title}</div>;
}
