"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export const Client = () => {
  const data = useUser();
  console.log(data);
  return <div>hi</div>;
};
