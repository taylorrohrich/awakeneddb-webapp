"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMedia } from "react-use";
import { twMerge } from "tailwind-merge";
import { useIsClient } from "../Deckbuilder/hooks";

interface Props extends PropsWithChildren {
  links: {
    segment: string;
    title: string;
    href: string;
  }[];
}
export function SideNavigation({ links, children }: Props) {
  const segments = useSelectedLayoutSegments();
  const [menuOpen, setMenuOpen] = useState(false);
  const segment = segments[0];
  const isWide = useMedia("(min-width: 640px)", true);
  const isClient = useIsClient();

  const toggleMenu = useCallback((isOpen: boolean) => {
    const body = document.querySelector("body");
    if (body) {
      if (isOpen) {
        body.style.setProperty("overflow", "hidden");
      } else {
        body.removeAttribute("style");
      }
    }
    setMenuOpen(isOpen);
  }, []);
  useEffect(() => {
    return () => {
      const body = document.querySelector("body");
      if (body) {
        body.removeAttribute("style");
      }
    };
  }, []);

  useEffect(() => {
    if (isWide) {
      toggleMenu(false);
    }
  }, [isWide, toggleMenu]);

  const menuItems = useMemo(
    () =>
      links.map((link) => (
        <Link
          onClick={!isWide ? () => toggleMenu(false) : undefined}
          key={link.title}
          href={link.href}
          className={twMerge(
            "pr-4 border-r-2 border-transparent hover:border-black text-lg font-semibold",
            link.segment === segment ? "border-black" : undefined
          )}
        >
          {link.title}
        </Link>
      )),
    [isWide, links, segment, toggleMenu]
  );
  const showMenu = isClient && !isWide;

  return (
    <div className="flex flex-col sm:flex-row relative">
      {menuOpen && (
        <div className="h-screen w-full z-10 flex absolute">
          <div className="h-full bg-white">
            <div className="flex flex-col gap-6 p-6">{menuItems}</div>
          </div>
          <div
            className="flex-1 bg-gray-500 opacity-40"
            onClick={() => toggleMenu(false)}
          />
        </div>
      )}
      <button
        aria-label="Open Side Menu"
        className="self-start p-3 m-3 sm:hidden rounded-md hover:bg-gray-200 flex items-center justify-center"
        onClick={() => toggleMenu(true)}
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>
      {!showMenu && (
        <div className="hidden sm:flex flex-col gap-6 p-6 h-full items-stretch sticky top-16 self-start">
          {menuItems}
        </div>
      )}
      {children}
    </div>
  );
}
