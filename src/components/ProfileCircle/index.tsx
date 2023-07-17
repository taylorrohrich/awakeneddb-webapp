import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface Props {
  title?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const getSize = cva(
  "rounded-full uppercase bg-hufflepuffYellow-500 text-white font-bold  flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-6 h-6 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-14 h-14 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
export function ProfileCircle({ title, className, size }: Props) {
  const firstLetter = title?.[0] ?? "";

  return (
    <div className={twMerge(getSize({ size }), className)}>{firstLetter}</div>
  );
}
