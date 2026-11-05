import { UnfoldVertical } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { memo, useMemo, useRef } from "react";
import { useSliderPosition } from "@/hooks/landing/useSliderPosition";

const ADVANTAGE_FEATURES = [
  {
    id: "iterations",
    title: "Infinite Iterations",
    description: "Test a hundred visual styles for your brand in a single day.",
  },
  {
    id: "location",
    title: "Zero Location Fees",
    description:
      "From Tokyo streets to Martian deserts - no travel, no permits.",
  },
  {
    id: "delivery",
    title: "Delivery in Days",
    description: "Compress full production timelines into 72 hours.",
  },
] as const;

const LEGACY_CONSTRAINTS = [
  {
    id: "overhead",
    title: "High Overhead Costs",
    description: "Crew of 50+, insurance, catering, equipment rental.",
  },
  {
    id: "logistics",
    title: "Location Logistics",
    description: "Permits, scouting, weather dependency, travel time.",
  },
  {
    id: "timeline",
    title: "Months of Waiting",
    description: "Linear pipelines: Pre-production > Shoot > Long Post.",
  },
] as const;

export const RealitySliderSection = memo(() => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {
    position,
    setPosition,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useSliderPosition(sliderRef);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(100, p + 5));
    }
  };

  const modernOpacity = useMemo(() => {
    if (position <= 60) return 1;
    const fadeProgress = (position - 60) / 40;
    return Math.max(0.2, 1 - fadeProgress * 0.8);
  }, [position]);

  const legacyOpacity = useMemo(() => {
    if (position >= 40) return 1;
    const fadeProgress = (40 - position) / 40;
    return Math.max(0.2, 1 - fadeProgress * 0.8);
  }, [position]);

  return (
    <section
      className="h-screen bg-black overflow-hidden flex flex-col relative"
      id="advantage"
    >
      <div
        ref={sliderRef}
        // Removed "touch-none" here to allow native mobile touch evaluation
        className="reality-slider relative w-full h-full cursor-ew-resize group select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp} // Ensures dragging is canceled on native scroll takeover
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-label="Compare traditional and modern production methods"
        aria-orientation="horizontal"
        tabIndex={0}
        style={
          {
            "--position": `${position}%`,
            touchAction: "pan-y", // CSS standard: Allows vertical native scrolling but defers horizontal handling
          } as React.CSSProperties
        }
      >
        {}
        <div
          className="absolute inset-0 flex items-center justify-end px-4 sm:px-6 md:px-12 lg:px-32 overflow-hidden transition-opacity duration-300 md:opacity-100"
          style={{
            clipPath: `inset(0 0 0 ${position}%)`,
            willChange: "clip-path",
            opacity: modernOpacity,
          }}
        >
          {}
          <Image
            src="/reality-slider/cinewex-way.webp"
            alt="Modern virtual production studio with advanced LED volume technology"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            draggable={false}
          />
          {}
          <div className="absolute inset-0 bg-linear-to-l from-black/95 via-black/70 to-transparent z-0" />
          <div className="relative z-10 text-right space-y-3 sm:space-y-6 md:space-y-12 max-w-[45%] sm:max-w-[40%] md:max-w-xl ml-auto">
            <div className="space-y-1 md:space-y-2">
              <span className="text-cyan-400 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] sm:text-xs">
                The Cinewex Way
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase italic leading-tight">
                AI-Powered Efficiency
              </h3>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
              {ADVANTAGE_FEATURES.map((feature, index) => (
                <div
                  key={feature.id}
                  className="backdrop-blur-md bg-white/5 border border-white/10 p-3 sm:p-4 md:p-6 rounded-lg transform transition-transform duration-300"
                  style={{
                    transform: `translateX(${(1 - modernOpacity) * 20 * (index + 1)}px)`,
                  }}
                >
                  <p className="text-white font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase mb-0 md:mb-1">
                    {feature.title}
                  </p>
                  <p className="text-white/70 text-[10px] sm:text-xs md:text-sm leading-relaxed hidden sm:block">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {}
        <div
          className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12 lg:px-32 overflow-hidden transition-opacity duration-300 md:opacity-100"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            opacity: legacyOpacity,
          }}
        >
          {}
          <Image
            src="/reality-slider/legacy.webp"
            alt="Traditional film production set with large crew and equipment"
            fill
            className="object-cover object-center"
            sizes="100vw"
            draggable={false}
          />
          {}
          <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/70 to-transparent z-0" />
          <div className="relative z-10 text-left space-y-3 sm:space-y-6 md:space-y-12 max-w-[45%] sm:max-w-[40%] md:max-w-xl">
            <div className="space-y-1 md:space-y-2">
              <span className="text-red-400 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] sm:text-xs">
                Legacy Production
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-none">
                Slow & Expensive
              </h3>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
              {LEGACY_CONSTRAINTS.map((constraint, index) => (
                <div
                  key={constraint.id}
                  className="backdrop-blur-md bg-white/5 border border-white/10 p-3 sm:p-4 md:p-6 rounded-lg transform transition-transform duration-300"
                  style={{
                    transform: `translateX(-${(1 - legacyOpacity) * 20 * (index + 1)}px)`,
                  }}
                >
                  <p className="text-white font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase mb-0 md:mb-1">
                    {constraint.title}
                  </p>
                  <p className="text-white/70 text-[10px] sm:text-xs md:text-sm leading-relaxed hidden sm:block">
                    {constraint.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {}
        <div
          className={`absolute inset-y-0 w-1 bg-white/50 backdrop-blur z-20 flex items-center justify-center transition-transform duration-150 ${isDragging ? "scale-110" : ""}`}
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-2 border-white/20 active:scale-95 transition-transform">
            <UnfoldVertical className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>
        {}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-widest md:hidden pointer-events-none transition-opacity duration-500 ${isDragging ? "opacity-0" : "opacity-100"}`}
        >
          Drag to compare
        </div>
      </div>
    </section>
  );
});

RealitySliderSection.displayName = "RealitySliderSection";
