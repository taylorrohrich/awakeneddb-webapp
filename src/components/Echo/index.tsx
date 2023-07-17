import { ROUTES } from "@/constants/routes";
import { getResourcePath } from "@/helpers/getResourcePath";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "@/components/Tooltip";

const DEFAULT_RATIO_WIDTH = 1;
const DEFAULT_RATIO_HEIGHT = 1;

export function EmptyEcho({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div style={{ width, height }} className="bg-slate-300 rounded-full"></div>
  );
}

interface Props {
  id?: number;
  name?: string;
  withLink?: boolean;
  withTooltip?: boolean;
  withAnimation?: boolean;
  size?: "sm" | "md";
}

const SIZE_RATIOS = {
  sm: { width: 50, height: 50 },
  md: { width: 80, height: 80 },
} as const;

export function Echo({
  id,
  name,
  withLink,
  withTooltip,
  withAnimation,
  size = "md",
}: Props) {
  const height = DEFAULT_RATIO_HEIGHT * SIZE_RATIOS[size].height;
  const width = DEFAULT_RATIO_WIDTH * SIZE_RATIOS[size].width;
  if (!id || !name) return <EmptyEcho width={width} height={height} />;
  const imagePath = getResourcePath(name, "echo", "image");

  let echo = (
    <Image
      alt={name}
      src={imagePath}
      width={width}
      height={height}
      className={
        withAnimation ? "hover:scale-110 transition-transform" : undefined
      }
    />
  );

  if (withLink) {
    echo = (
      <Link key={id} href={ROUTES.echo(id)}>
        {echo}
      </Link>
    );
  }
  if (withTooltip) {
    echo = <Tooltip title={name}>{echo}</Tooltip>;
  }

  return echo;
}
