import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function LinkButton({
  children,
  className,
  ...linkProps
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...linkProps}
      className={twMerge(
        "py-1 px-4 bg-indigo-700 rounded-md text-white hover:bg-indigo-500 disabled:bg-slate-300",
        className
      )}
    >
      {children}
    </Link>
  );
}
