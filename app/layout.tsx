import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURELIA ATELIER — Haute Horlogerie Suisse",
  description:
    "Mastered chronometry and architectural timepieces. Hand-finished in Geneva with in-house Calibre 104.",
  keywords: [
    "Luxury Watch",
    "Haute Horlogerie",
    "Swiss Made",
    "Geneva Seal",
    "Aurelia Atelier",
    "Calibre 104",
  ],
  openGraph: {
    title: "AURELIA ATELIER — Haute Horlogerie Suisse",
    description:
      "Mastered chronometry and architectural timepieces. Hand-finished in Geneva with in-house Calibre 104.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakarta.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#08090A] text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
