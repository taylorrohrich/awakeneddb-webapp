import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props {
  cost?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}
const DEFAULT_RATIO_WIDTH = 13;
const DEFAULT_RATIO_HEIGHT = 20;

const SIZE_RATIOS = {
  sm: 1,
  md: 2,
  lg: 3,
} as const;

export function Cost({ cost, size = "md", className }: Props) {
  const width = DEFAULT_RATIO_WIDTH * SIZE_RATIOS[size];
  const height = DEFAULT_RATIO_HEIGHT * SIZE_RATIOS[size];

  return (
    <div
      className={twMerge("relative flex justify-center", className)}
      style={{ width, height }}
    >
      <Image
        src="/general/cost.png"
        alt={`Card Cost: ${cost}`}
        width={width}
        height={height}
      />
      {cost != null && (
        <div
          className={twMerge(
            "absolute top-[25%]",
            cost > 9 ? "text-xl" : "text-2xl"
          )}
        >
          {cost}
        </div>
      )}
    </div>
  );
}
