import { Rarity } from "@/types/rarity";
import { cva } from "class-variance-authority";

export const getRarityStyle = cva([""], {
  variants: {
    text: {
      [Rarity.COMMON]: ["text-common"],
      [Rarity.RARE]: ["text-rare"],
      [Rarity.EPIC]: ["text-epic"],
      [Rarity.LEGENDARY]: ["text-legendary"],
      [Rarity.DARK]: ["text-dark"],
      [Rarity.MYTHIC]: ["text-mythic"],
    },
    bg: {
      [Rarity.COMMON]: ["bg-common"],
      [Rarity.RARE]: ["bg-rare"],
      [Rarity.EPIC]: ["bg-epic"],
      [Rarity.LEGENDARY]: ["bg-legendary"],
      [Rarity.DARK]: ["bg-dark"],
      [Rarity.MYTHIC]: ["bg-mythic"],
    },
    border: {
      [Rarity.COMMON]: ["border-common"],
      [Rarity.RARE]: ["border-rare"],
      [Rarity.EPIC]: ["border-epic"],
      [Rarity.LEGENDARY]: ["border-legendary"],
      [Rarity.DARK]: ["border-dark"],
      [Rarity.MYTHIC]: ["border-mythic"],
    },
  },
});
