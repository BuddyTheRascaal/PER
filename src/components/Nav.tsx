"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

const LINKS = [
  { href: "/simulateur", label: "Le Circuit" },
  { href: "/copilotes", label: "Le Rallye Copilotes" },
  { href: "/a-propos", label: "À propos" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-anthracite text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5 font-livree text-lg font-bold uppercase tracking-wide">
          <Logo className="h-8 w-8" tone="light" />
          <span>Circuit Patrimonial</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-livree text-sm uppercase tracking-wide transition-colors hover:text-race-orange ${
                pathname === link.href ? "text-race-orange" : "text-white/85"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/espace-copilote"
            className="font-livree text-sm uppercase tracking-wide text-white/85 hover:text-race-orange"
          >
            Espace Copilote
          </Link>
          <Link
            href="/simulateur"
            className="-skew-x-6 bg-race-orange px-4 py-2 font-livree text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-race-orange-dark"
          >
            <span className="inline-block skew-x-6">Prendre le départ</span>
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-5 py-4 md:hidden">
          {[...LINKS, { href: "/espace-copilote", label: "Espace Copilote" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 font-livree text-sm uppercase tracking-wide text-white/85 hover:text-race-orange"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/simulateur"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block w-fit bg-race-orange px-4 py-2 font-livree text-sm font-bold uppercase tracking-wide text-white"
          >
            Prendre le départ
          </Link>
        </nav>
      )}
    </header>
  );
}
