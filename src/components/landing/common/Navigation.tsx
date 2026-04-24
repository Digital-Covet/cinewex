import { NavigationMenu } from "@base-ui/react/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { NAVIGATION_LINKS } from "@/constants/landing/navigation";

export const Navigation = memo(() => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-[#0A0A0C]/40 backdrop-blur-lg border-b border-white/10">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        <Link href="/">
          <Image
            src="/cinewex.svg"
            alt="Cinewex Logo"
            width={100}
            height={50}
            priority
          />
        </Link>
        <NavigationMenu.Root className="hidden md:flex gap-10 items-center">
          <NavigationMenu.List className="flex gap-10 items-center">
            {NAVIGATION_LINKS.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <NavigationMenu.Link
                  className={`font-headline tracking-tight transition-colors text-sm ${link.isActive
                      ? "text-white hover:text-cyan-400"
                      : "text-zinc-400 hover:text-white"
                    }`}
                  href={link.href}
                >
                  {link.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <Link
          href="https://digitalcovet.com/contact-us/"
          className="btn-primary-gradient text-white px-5 py-2 font-headline font-bold uppercase tracking-widest text-[10px] transition-all"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
});

Navigation.displayName = "Navigation";
