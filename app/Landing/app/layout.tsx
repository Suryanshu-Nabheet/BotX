import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BotX",
  description: "The Fastest AI BotX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} dark antialiased`}>
        {/* top gradient */}
        <div className="pointer-events-none absolute inset-0 top-[-400px] left-[40%] h-[280px] w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,_#3b82f6_100%)] opacity-90 blur-[200px] lg:w-[800px]" />
        <Navbar />
        <main className="mx-auto flex max-w-7xl flex-col px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
