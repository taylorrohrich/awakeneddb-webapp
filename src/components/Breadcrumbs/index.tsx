import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

interface Props {
  crumbs: { href: string; title: string }[];
  title: string;
}

export function Breadcrumbs({ crumbs, title }: Props) {
  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      {crumbs.map((crumb) => (
        <React.Fragment key={crumb.href}>
          <Link href={crumb.href}>{crumb.title}</Link>
          <FontAwesomeIcon icon={faChevronRight} className="text-base" />
        </React.Fragment>
      ))}
      <div>{title}</div>
    </div>
  );
}
