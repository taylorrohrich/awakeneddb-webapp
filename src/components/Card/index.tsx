import { CardInfo } from "@/types/cardInfo";
import { getResourcePath } from "@/helpers/getResourcePath";
import { CardType } from "@/types/cardType";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { Tooltip } from "@/components/Tooltip";
import { Cost } from "@/components/Cost";
import { twMerge } from "tailwind-merge";

const EXTENDED_HEIGHT_CARDS = [
  "/image/companion/ron_weasley.png",
  "/image/magic/crucio.png",
  "/image/magic/avada_kedavra.png",
];

const DEFAULT_RATIO_WIDTH = 16;
const DEFAULT_RATIO_HEIGHT = 22;

interface CardImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}
export function CardImage({
  src,
  alt,
  width,
  height,
  className,
}: CardImageProps) {
  return (
    <Image
      alt={alt}
      src={src}
      width={width}
      height={height}
      className={className}
    />
  );
}

export function EmptyCard({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div
      style={{ width, height }}
      className="from-slate-200 to-slate-400 rounded-sm bg-gradient-to-tr shadow-lg"
    ></div>
  );
}

interface CardProps extends Partial<CardInfo> {
  type: CardType.MAGIC | CardType.COMPANION;
  withLink?: boolean;
  withTooltip?: boolean;
  withAnimation?: boolean;
  cost?: number;
  size?: "sm" | "md" | "lg";
}

const SIZE_RATIOS = {
  sm: 3,
  md: 5,
  lg: 8,
} as const;
export function Card({
  id,
  name,
  type,
  withLink,
  withTooltip,
  withAnimation,
  size = "md",
  cost,
}: CardProps) {
  const multiplier = SIZE_RATIOS[size];
  let height = DEFAULT_RATIO_HEIGHT * multiplier;
  const width = DEFAULT_RATIO_WIDTH * multiplier;

  if (!id || !name) return <EmptyCard width={width} height={height} />;

  const imagePath = getResourcePath(name, type, "image");
  if (EXTENDED_HEIGHT_CARDS.includes(imagePath)) {
    height += multiplier;
  }

  const animationClassName = withAnimation
    ? "hover:scale-110 transition-transform"
    : undefined;
  let card = (
    <CardImage
      className={cost == null ? animationClassName : undefined}
      src={imagePath}
      alt={name}
      width={width}
      height={height}
    />
  );

  if (cost != null) {
    card = (
      <div className={twMerge("relative", animationClassName)}>
        {card}
        <Cost
          cost={cost}
          size={size}
          className="absolute top-0 left-0 -translate-x-2 -translate-y-1/3"
        />
      </div>
    );
  }

  if (withLink) {
    card = (
      <Link key={id} href={ROUTES.card(id)}>
        {card}
      </Link>
    );
  }
  if (withTooltip) {
    card = <Tooltip title={name}>{card}</Tooltip>;
  }

  return card;
}
