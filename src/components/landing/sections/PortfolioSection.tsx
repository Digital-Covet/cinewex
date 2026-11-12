import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import { PORTFOLIO_ITEMS } from "@/constants/landing/portfolio";
import { usePortfolioBackgrounds } from "@/hooks/landing/usePortfolioBackgrounds";
import { PortfolioItem } from "../common/PortfolioItem";

const PortfolioBackground = memo<{
  readonly id: string;
  readonly isVisible: boolean;
  readonly imagePath: string;
  readonly backgroundColor: string;
}>(({ id, isVisible, imagePath, backgroundColor }) => {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setHasEntered(false);
      return;
    }

    // Flip on the next frame so the freshly mounted layer fades in.
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [isVisible]);

  return (
    <div
      className={`portfolio-bg absolute inset-0 transition-opacity duration-700 ease-out ${
        hasEntered ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor }}
    >
      <Image
        alt={`${id} background`}
        className="w-full h-full object-cover opacity-40 mix-blend-screen"
        src={imagePath}
        width={2688}
        height={1568}
        sizes="100vw"
        quality={50}
        loading="lazy"
      />
    </div>
  );
});

PortfolioBackground.displayName = "PortfolioBackground";

export const PortfolioSection = memo(() => {
  const { active, previous, show, clear } = usePortfolioBackgrounds();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    element.addEventListener("mouseleave", clear);
    return () => element.removeEventListener("mouseleave", clear);
  }, [clear]);

  return (
    <section
      ref={sectionRef}
      className="deferred-section relative min-h-dvh h-auto md:h-screen md:min-h-screen flex items-center overflow-hidden py-16 md:py-32"
      id="services"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0A0C]" />
        {PORTFOLIO_ITEMS.map((item) => {
          const isActive = active === item.backgroundId;
          const isPrevious = previous === item.backgroundId;

          if (!isActive && !isPrevious) return null;

          return (
            <PortfolioBackground
              key={item.backgroundId}
              id={item.backgroundId}
              isVisible={isActive}
              imagePath={item.imagePath}
              backgroundColor={item.backgroundColor}
            />
          );
        })}
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
            <PortfolioItem key={item.id} item={item} onMouseEnter={show} />
          ))}
        </div>
      </div>
    </section>
  );
});

PortfolioSection.displayName = "PortfolioSection";
