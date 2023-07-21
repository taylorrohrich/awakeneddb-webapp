"use client";

import Link from "next/link";
import { PropsWithChildren, useRef, useState } from "react";
import { useClickAway } from "react-use";

interface Props extends PropsWithChildren {
  links: { label: string; href: string; prefetch?: boolean }[];
}

export function Menu({ links, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setIsOpen(false);
  });
  return (
    <div className="relative" ref={ref}>
      <div>
        <button
          type="button"
          className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup
        >
          {children}
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {links.map(({ label, href, prefetch }, i) => (
            <Link
              prefetch={prefetch ?? true}
              onClick={() => setIsOpen(false)}
              key={label}
              href={href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              id={`menu-item-${i}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
