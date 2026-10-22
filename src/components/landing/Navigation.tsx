"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/constants/landing";
import { cn } from "@/lib/utils";
import CtaLink from "./CtaLink";
export default function Navigation() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-line bg-canvas/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="container-cine flex h-16 items-center justify-between gap-6"
      >
        <a href="#hero" aria-label="Cinewex, back to top" className="shrink-0">
          <Image
            src="/cinewex.svg"
            alt="Cinewex"
            width={142}
            height={20}
            priority
            unoptimized
            className="h-4 w-auto md:h-[18px]"
          />
        </a>
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaLink size="sm">Get Started</CtaLink>
        </div>
      </nav>
    </header>
  );
}
