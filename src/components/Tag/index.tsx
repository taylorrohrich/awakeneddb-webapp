import { Category } from "@/types/category";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface Props {
  title: string;
  category: Category;
}

const getTagStyle = cva("rounded px-2 py-1 text-white", {
  variants: {
    style: {
      [Category.CLASSROOM]: "bg-parchment",
      [Category.DUEL]: "bg-duel",
      [Category.SOLO_EXPLORATION]: "bg-soloExploration",
      [Category.DEATHLY_DELL]: "bg-deathlyDell",
      [Category.HAUNTED_HOLLOW]: "bg-hauntedHollow",
    },
  },
});
export function Tag({ title, category }: Props) {
  return (
    <div className={twMerge(getTagStyle({ style: category }))}>{title}</div>
  );
}
