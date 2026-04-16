import { ArrowUpRight } from "lucide-react";
import { memo, useCallback } from "react";
import type {
  BackgroundId,
  PortfolioItem as PortfolioItemType,
} from "@/types/landing";

interface PortfolioItemProps {
  readonly item: PortfolioItemType;
  readonly onMouseEnter: (backgroundId: BackgroundId) => void;
  readonly onMouseLeave: (backgroundId: BackgroundId) => void;
}

export const PortfolioItem = memo<PortfolioItemProps>(
  ({ item, onMouseEnter, onMouseLeave }) => {
    const handleMouseEnter = useCallback(() => {
      onMouseEnter(item.backgroundId);
    }, [item.backgroundId, onMouseEnter]);

    const handleMouseLeave = useCallback(() => {
      onMouseLeave(item.backgroundId);
    }, [item.backgroundId, onMouseLeave]);

    const borderColorClass =
      item.hoverColor === "cyan"
        ? "hover:border-cyan-400"
        : "hover:border-purple-400";

    return (
      <button
        type="button"
        className={`portfolio-item group w-full text-left py-5 md:py-6 lg:py-8 border-b border-white/10 ${borderColorClass} transition-colors`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white transition-all duration-500 group-hover:translate-x-2 md:group-hover:translate-x-4 uppercase leading-[1.1]">
            {item.title}
          </h3>
          <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </div>
      </button>
    );
  },
);

PortfolioItem.displayName = "PortfolioItem";
