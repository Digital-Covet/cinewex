import Image from "next/image";
import Facebook from "@/assets/brands/facebook";
import Instagram from "@/assets/brands/instagram";
import LinkedIn from "@/assets/brands/linkedin";
import Threads from "@/assets/brands/threads";
import XSvg from "@/assets/brands/x";
import Youtube from "@/assets/brands/youtube";
import { LEGAL_LINKS, SOCIAL_LINKS } from "@/constants/landing";
import ShareButton from "../ShareButton";

const SOCIALS = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: Instagram },
  { label: "Threads", href: SOCIAL_LINKS.threads, Icon: Threads },
  { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: Facebook },
  { label: "YouTube", href: SOCIAL_LINKS.youtube, Icon: Youtube },
  { label: "X", href: SOCIAL_LINKS.x, Icon: XSvg },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: LinkedIn },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-cine flex flex-col gap-10 py-12 md:flex-row md:items-center md:justify-between md:py-14">
        <div className="flex flex-col gap-3">
          <Image
            src="/cinewex.svg"
            alt="Cinewex"
            width={170}
            height={24}
            unoptimized
            className="h-5 w-auto self-start"
          />
          <p className="text-sm text-fg-muted">
            © {new Date().getFullYear()} Cinewex. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <ul className="flex flex-wrap items-center gap-1">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-control text-fg-muted transition-colors hover:bg-raised hover:text-fg"
                >
                  <Icon aria-hidden="true" className="size-5" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-6">
            <ShareButton />
            <ul className="flex items-center gap-5 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
