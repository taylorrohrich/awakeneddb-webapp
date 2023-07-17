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
      [Category.CLASSROOM]: "bg-ravenclawSilver-600",
      [Category.SOLO_DUEL]: "bg-hufflepuffYellow-800",
      [Category.DUO_DUEL]: "bg-gryffindorRed-800",
      [Category.FORBIDDEN_FOREST]: "bg-slytherinGreen-800",
    },
  },
});
export function Tag({ title, category }: Props) {
  return (
    <div className={twMerge(getTagStyle({ style: category }))}>{title}</div>
  );
}
