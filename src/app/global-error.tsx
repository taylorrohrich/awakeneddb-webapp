"use client";

import { Button } from "@/components/Button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="w-full h-screen flex items-center justify-center">
          <h2 className="pr-3 border-r">Something went wrong!</h2>
          <Button onClick={() => reset()}>Try again</Button>
        </main>
      </body>
    </html>
  );
}
