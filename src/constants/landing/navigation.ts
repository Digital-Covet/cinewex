import type { NavigationLink } from "@/types/landing";

export const NAVIGATION_LINKS: readonly NavigationLink[] = [
  { label: "Advantage", href: "#advantage", isActive: true },
  { label: "Portfolio", href: "#portfolio", isActive: false },
  { label: "Workflow", href: "#workflow", isActive: false },
  { label: "Pricing", href: "#", isActive: false },
] as const;

export const FOOTER_LINKS: readonly NavigationLink[] = [
  { label: "Privacy", href: "https://digitalcovet.com/privacy-policy/" },
  { label: "Terms", href: "https://digitalcovet.com/terms-conditions/" },
] as const;
