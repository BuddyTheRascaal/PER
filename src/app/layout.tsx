import type { Metadata } from "next";
import { Inter, Oswald, Anton } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PER Grand Prix — La Défense Mondiale",
  description:
    "Votre retraite mérite une stratégie de course, pas une ligne droite. Simulez votre PER et prenez position sur la grille fiscale.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${oswald.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cockpit-bg text-cockpit-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
