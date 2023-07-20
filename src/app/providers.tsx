"use client";

import { PropsWithChildren } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ToastContainer } from "react-toastify";

export const Providers = ({ children }: PropsWithChildren) => (
  <UserProvider>
    {children}
    <ToastContainer position="bottom-left" />
  </UserProvider>
);
