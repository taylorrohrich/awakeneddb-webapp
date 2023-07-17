import { ROUTES } from "@/constants/routes";
import Link from "next/link";

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
