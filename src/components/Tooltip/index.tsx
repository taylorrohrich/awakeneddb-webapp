"use client";

import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: React.ReactNode;
  anchor?: "top" | "bottom";
}

const getTooltipPosition = cva(
  "text-base font-normal absolute z-20 -translate-x-[50%] invisible group-active:visible group-hover:visible left-2/4 rounded-md shadow-md bg-gray-100 p-1 px-2 whitespace-nowrap",
  {
    variants: {
      anchor: {
        top: "bottom-[calc(100%+10px)]",
        bottom: "top-[calc(100%+10px)]",
      },
    },
    defaultVariants: {
      anchor: "top",
    },
  }
);
export function Tooltip({ children, title, anchor = "bottom" }: Props) {
  if (!title) return children;
  return (
    <div className="relative flex group">
      <div className={getTooltipPosition({ anchor })}>{title}</div>
      {children}
    </div>
  );
}
