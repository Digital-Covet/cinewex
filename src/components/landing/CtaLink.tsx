import { ArrowUpRight } from "lucide-react";
import { TALLY_URL } from "@/constants/landing";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg md:h-16 md:px-10",
};

/** Primary conversion button. Always opens the Tally project brief. */
export default function CtaLink({
  children,
  size = "md",
  className,
}: {
  children: React.ReactNode;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <a
      href={TALLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 rounded-control bg-gold font-medium text-gold-ink transition-[background-color,transform] duration-200 ease-cine hover:bg-fg active:scale-[0.97]",
        SIZES[size],
        className,
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-[1.1em] transition-transform duration-200 ease-cine group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
