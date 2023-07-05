import Image from "next/image";
import Link from "next/link";
import { getSession, getAccessToken } from "@auth0/nextjs-auth0";
import { Client } from "./client";

export default async function Home() {
  const session = await getSession();
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link href="/api/auth/login">login</Link>
        <Client />
      </div>
    </main>
  );
}
