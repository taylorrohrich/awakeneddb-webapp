"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface Props {
  links: {
    segment: string;
    title: string;
    href: string;
  }[];
}
export function SideNavigation({ links }: Props) {
  const segments = useSelectedLayoutSegments();
  if (segments.length > 1) return null;
  const segment = segments[0];
  return (
    <div className="flex flex-col gap-6 p-6 h-full items-stretch sticky top-24 self-start">
      {links.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className={twMerge(
            "pr-4 border-r-2 border-transparent hover:border-black text-lg font-semibold",
            link.segment === segment ? "border-black" : undefined
          )}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
