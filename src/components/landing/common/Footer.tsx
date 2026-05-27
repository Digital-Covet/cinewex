import { Button } from "@base-ui/react/button";
import { Toggle } from "@base-ui/react/toggle";
import { Check, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { SocialIconButton } from "@/components/landing/footer/SocialIconButton";
import { FOOTER_LINKS } from "@/constants/landing/navigation";
import { SOCIAL_LINKS } from "@/constants/landing/social";
import { useShare } from "@/hooks/landing/useShare";

// --- Extracted Class Constants ---

const FOOTER_BASE_CLASSES = "bg-[#0A0A0C] py-12 border-t border-white/5";

const TOGGLE_BASE_CLASSES =
  "w-10 h-10 rounded-full glass-panel flex items-center justify-center " +
  "cursor-pointer transition-all duration-300 text-zinc-400";

const NAV_LINK_CLASSES =
  "text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-cyan-400 transition-colors";

// --- Helper Functions ---

const getToggleClassName = (pressed: boolean) =>
  `${TOGGLE_BASE_CLASSES} ${pressed
    ? "bg-purple-500 text-white"
    : "hover:bg-purple-500 hover:text-white"
  }`;

const getShareAriaLabel = (isShared: boolean) =>
  isShared ? "Link copied to clipboard" : "Share current page";

// --- Component ---

interface FooterProps {
  className?: string;
}

export const Footer = memo<FooterProps>(({ className = "" }) => {
  const { isShared, handleShare } = useShare();

  return (
    <footer className={`${FOOTER_BASE_CLASSES} ${className}`}>
      <div className="max-w-screen-2xl mx-auto px-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Logo & Copyright */}
        <Link href="/" className="flex flex-col gap-4 text-center md:text-left">
          <Image
            src="/cinewex.svg"
            alt="Cinewex Logo"
            width={100}
            height={50}
            priority
          />
          <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-600">
            Copyright: © 2026 CINEWEX. AI CREATIVE STUDIO FOR BRANDS &
            Businesses.
          </p>
        </Link>

        {/* Navigation Links */}
        <nav
          className="flex justify-center gap-10"
          aria-label="Footer navigation"
        >
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} className={NAV_LINK_CLASSES} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Share & Social Icons */}
        <div className="flex justify-center md:justify-end gap-4">
          <Toggle
            aria-label={getShareAriaLabel(isShared)}
            pressed={isShared}
            onPressedChange={handleShare}
            className={(state) => getToggleClassName(state.pressed)}
            render={(props, state) => (
              <Button {...props} type="button">
                {state.pressed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </Button>
            )}
          />

          {SOCIAL_LINKS.map((social) => (
            <SocialIconButton key={social.href} {...social} />
          ))}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
