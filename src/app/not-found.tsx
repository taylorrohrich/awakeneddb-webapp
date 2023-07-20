import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import Link from "next/link";

export const metadata = {
  title: `Not Found | ${SITE_NAME}`,
};

export default function NotFound() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <h2 className="pr-3 border-r">Page Not Found</h2>
      <Link href={ROUTES.home} className="pl-3 text-lg font-semibold">
        Home
      </Link>
    </main>
  );
}
