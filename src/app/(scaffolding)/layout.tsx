import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="h-contentBody flex-1">{children}</main>
      <Footer />
    </>
  );
}
