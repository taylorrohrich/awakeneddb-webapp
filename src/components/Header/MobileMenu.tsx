"use client";

import { useHeaderMenu } from "@/app/providers";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NAV_LINKS } from "./constants";
import { useMedia } from "react-use";
import { useEffect } from "react";
import { RouteLink } from "../RouteLink";

export function MobileMenuDropdown() {
  const { setMenuOpen, menuOpen } = useHeaderMenu();
  const isWide = useMedia("(min-width: 640px)", true);
  useEffect(() => {
    isWide && setMenuOpen(false);
  }, [isWide, setMenuOpen]);

  if (!menuOpen) {
    return null;
  }
  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="flex flex-col gap-3 p-4">
        {NAV_LINKS.map(({ href, label, re }) => (
          <RouteLink
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            re={re}
          >
            {label}
          </RouteLink>
        ))}
      </div>
    </div>
  );
}

export function MobileMenuIcon() {
  const { setMenuOpen, menuOpen } = useHeaderMenu();
  return (
    <button
      onClick={() => {
        setMenuOpen(!menuOpen);
      }}
      aria-label="Open Side Menu"
      className="p-3 mr-auto sm:hidden rounded-md hover:bg-gray-200 flex items-center justify-center"
    >
      <FontAwesomeIcon icon={faBars} className="text-xl" />
    </button>
  );
}
