import { CardType } from "@/types/cardType";
import { getFileName } from "./getFileName";

type ImageType = CardType.COMPANION | CardType.MAGIC | "echo";

export function getResourcePath(
  name: string,
  type: ImageType,
  fileType: "markdown" | "image"
) {
  const extension = fileType === "markdown" ? ".md" : ".png";
  const prefix = fileType === "markdown" ? "document" : "/image";
  const imageName = getFileName(name);
  switch (type) {
    case CardType.COMPANION:
      return `${prefix}/companion/${imageName}${extension}`;
    case CardType.MAGIC:
      return `${prefix}/magic/${imageName}${extension}`;
    case "echo":
      return `${prefix}/echo/${imageName}${extension}`;
  }
}
