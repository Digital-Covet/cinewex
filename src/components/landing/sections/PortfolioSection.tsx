import Image from "next/image";
import { memo } from "react";
import { PORTFOLIO_ITEMS } from "@/constants/landing/portfolio";
import { usePortfolioBackgrounds } from "@/hooks/landing/usePortfolioBackgrounds";
import type { BackgroundId } from "@/types/landing";
import { PortfolioItem } from "../common/PortfolioItem";

const PortfolioBackground = memo<{
  readonly id: BackgroundId;
  readonly isVisible: boolean;
  readonly imagePath: string;
  readonly backgroundColor: string;
}>(({ id, isVisible, imagePath, backgroundColor }) => (
  <div
    className={`portfolio-bg absolute inset-0 transition-opacity duration-600 ${isVisible ? "opacity-100" : "opacity-0"
      }`}
    style={{ backgroundColor }}
  >
    <Image
      alt={`${id} background`}
      className="w-full h-full object-cover opacity-40 mix-blend-screen"
      src={imagePath}
      width={2688}
      height={1568}
    />
  </div>
));

PortfolioBackground.displayName = "PortfolioBackground";

export const PortfolioSection = memo(() => {
  const { backgrounds, show, hide } = usePortfolioBackgrounds();

  return (
    <section
      className="relative min-h-[100dvh] h-auto md:h-screen md:min-h-screen flex items-center overflow-hidden py-16 md:py-32 snap-start"
      id="portfolio"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0A0C]" />
        {PORTFOLIO_ITEMS.map((item) => (
          <PortfolioBackground
            key={item.backgroundId}
            id={item.backgroundId}
            isVisible={backgrounds[item.backgroundId]}
            imagePath={item.imagePath}
            backgroundColor={item.backgroundColor}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50" />
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <span className="text-cyan-400 font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">
            Portfolio Exhibition
          </span>
          <h2 className="font-headline text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white uppercase mix-blend-difference leading-[0.9] md:leading-none">
            OUR SERVICES
          </h2>
        </div>

        <div className="flex flex-col space-y-0 items-start">
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioItem
              key={item.id}
              item={item}
              onMouseEnter={show}
              onMouseLeave={hide}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

PortfolioSection.displayName = "PortfolioSection";
