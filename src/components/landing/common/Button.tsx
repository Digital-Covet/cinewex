import { memo } from "react";
import type { ButtonProps } from "@/types/landing";

const buttonVariants: Record<string, string> = {
  primary: "btn-primary-gradient text-white",
  secondary: "glass-panel text-white hover:bg-white/10",
  icon: "glass-panel hover:bg-cyan-400 hover:text-black",
};

const buttonSizes: Record<string, string> = {
  sm: "px-5 py-2 text-[10px]",
  md: "px-12 py-5 text-xs",
  lg: "px-12 py-8 text-sm md:text-base",
};

export const Button = memo<ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    children,
    onClick,
    className = "",
    ariaLabel,
  }) => {
    const baseClasses =
      "font-headline font-bold uppercase tracking-widest transition-all";
    const variantClasses = buttonVariants[variant] || buttonVariants.primary;
    const sizeClasses = buttonSizes[size] || buttonSizes.md;

    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
