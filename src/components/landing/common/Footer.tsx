import { Button } from "@base-ui/react/button";
import { Toggle } from "@base-ui/react/toggle";
import { AtSign, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import { FOOTER_LINKS } from "@/constants/landing/navigation";

interface FooterProps {
  className?: string;
}

export const Footer = memo<FooterProps>(({ className = "" }) => {
  const [isShared, setIsShared] = useState(false);

  return (
    <footer
      className={`bg-[#0A0A0C] py-12 border-t border-white/5 ${className}`}
    >
      <div className="max-w-screen-2xl mx-auto px-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <Image
            src="/cinewex.svg"
            alt="Cinewex Logo"
            width={100}
            height={50}
            priority
          />
          <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-600">
            © 2026 CINEWEX. THE ETHEREAL PROJECTION.
          </p>
        </div>
        <div className="flex justify-center gap-10">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-cyan-400 transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex justify-center md:justify-end gap-4">
          <button
            type="button"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center cursor-pointer hover:bg-cyan-400 hover:text-black transition-all duration-300"
            aria-label="Contact via email"
          >
            <AtSign className="w-4 h-4" />
          </button>
          <Toggle
            aria-label="Share"
            pressed={isShared}
            onPressedChange={setIsShared}
            className={(state) =>
              `w-10 h-10 rounded-full glass-panel flex items-center justify-center cursor-pointer transition-all duration-300 ${state.pressed
                ? "bg-purple-500 text-white"
                : "hover:bg-purple-500 hover:text-white"
              }`
            }
            render={(props, _state) => (
              <Button {...props} type="button">
                <Share2 className="w-4 h-4" />
              </Button>
            )}
          />
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
