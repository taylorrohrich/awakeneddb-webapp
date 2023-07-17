import "./globals.css";
import { EB_Garamond } from "next/font/google";
import { Providers } from "./providers";

const inter = EB_Garamond({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
