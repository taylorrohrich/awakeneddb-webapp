"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export function RouteLink({
  className,
  href,
  ...props
}: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const routeActive = useMemo(() => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href.toString());
  }, [href, pathname]);

  return (
    <Link
      {...props}
      href={href}
      className={twMerge(className, routeActive ? "text-dark" : undefined)}
    />
  );
}
