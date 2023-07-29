"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ToastContainer } from "react-toastify";

interface HeaderContext {
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}
const HeaderContext = createContext<HeaderContext>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export function useHeaderMenu() {
  return useContext(HeaderContext);
}
function HeaderProvider({ children }: PropsWithChildren) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <HeaderContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </HeaderContext.Provider>
  );
}
export const Providers = ({ children }: PropsWithChildren) => (
  <UserProvider>
    <HeaderProvider>{children}</HeaderProvider>
    <ToastContainer position="bottom-left" />
  </UserProvider>
);
