import Link from "next/link";
import { type ComponentType, memo } from "react";

interface SocialIconButtonProps {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  hoverBgClass: string;
}

const BASE_CLASSES =
  "w-10 h-10 rounded-full glass-panel flex items-center justify-center " +
  "cursor-pointer transition-all duration-300 text-zinc-400 hover:text-white";

export const SocialIconButton = memo<SocialIconButtonProps>(
  ({ href, label, icon: Icon, hoverBgClass }) => (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE_CLASSES} ${hoverBgClass}`}
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </Link>
  ),
);

SocialIconButton.displayName = "SocialIconButton";
