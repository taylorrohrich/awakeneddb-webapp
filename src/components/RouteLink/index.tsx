"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export function RouteLink({
  className,
  href,
  re,
  ...props
}: ComponentProps<typeof Link> & { re: string }) {
  const pathname = usePathname();
  const routeActive = useMemo(() => {
    return RegExp(re).test(pathname);
  }, [re, pathname]);

  return (
    <Link
      {...props}
      href={href}
      className={twMerge(className, routeActive ? "text-dark" : undefined)}
    />
  );
}
