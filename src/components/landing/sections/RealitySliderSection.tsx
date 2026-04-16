import { UnfoldVertical } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { memo, useMemo, useRef } from "react";
import { useSliderPosition } from "@/hooks/landing/useSliderPosition";

const ADVANTAGE_FEATURES = [
  {
    id: "iterations",
    title: "Infinite Iterations",
    description: "Explore a thousand styles in seconds.",
  },
  {
    id: "location",
    title: "Zero Location Fees",
    description: "From Mars to Metropolis, no travel needed.",
  },
  {
    id: "delivery",
    title: "Delivery in Days",
    description: "Collapse month-long schedules into 72 hours.",
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

  // Keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(100, p + 5));
    }
  };

  // Dynamic opacity calculations based on slider position
  // When slider is at 50%, both sides are at 50% opacity on mobile
  // When slider moves left (position < 50), modern side fades out
  // When slider moves right (position > 50), legacy side fades out
  const modernOpacity = useMemo(() => {
    // Normalize position: 0 = fully visible, 1 = fully hidden when dragged left
    const fadeStart = 40; // Start fading when position is less than 40%
    if (position >= fadeStart) return 1;
    return Math.max(0.2, position / fadeStart);
  }, [position]);

  const legacyOpacity = useMemo(() => {
    // Normalize position: 100 = fully visible, 60 = start fading
    const fadeStart = 60; // Start fading when position is greater than 60%
    if (position <= fadeStart) return 1;
    return Math.max(0.2, (100 - position) / (100 - fadeStart));
  }, [position]);

  return (
    <section
      className="h-screen bg-black overflow-hidden flex flex-col snap-start relative"
      id="advantage"
    >
      <div
        ref={sliderRef}
        className="reality-slider relative w-full h-full cursor-ew-resize group touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
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
            touchAction: "none",
          } as React.CSSProperties
        }
      >
        {/* --- MODERN SIDE (The Cinewex Way) --- */}
        <div
          className="absolute inset-0 flex items-center justify-end px-4 sm:px-6 md:px-12 lg:px-32 overflow-hidden transition-opacity duration-300 md:opacity-100"
          style={{
            clipPath: `inset(0 0 0 ${position}%)`,
            willChange: "clip-path",
            opacity: modernOpacity, // Dynamic fade on mobile
          }}
        >
          {/* Background Image */}
          <Image
            src="/reality-slider/cinewex-way.webp"
            alt="Modern virtual production studio with advanced LED volume technology"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            draggable={false}
          />
          {/* Gradient Overlay - Dark to Transparent from right to center */}
          <div className="absolute inset-0 bg-linear-to-l from-black/95 via-black/70 to-transparent z-0" />

          <div className="relative z-10 text-right space-y-3 sm:space-y-6 md:space-y-12 max-w-[45%] sm:max-w-[40%] md:max-w-xl ml-auto">
            <div className="space-y-1 md:space-y-2">
              <span className="text-cyan-400 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] sm:text-xs">
                The Cinewex Way
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase italic leading-tight">
                Hyper-Efficiency
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

        {/* --- LEGACY SIDE (Traditional Production) --- */}
        <div
          className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12 lg:px-32 overflow-hidden transition-opacity duration-300 md:opacity-100"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            opacity: legacyOpacity, // Dynamic fade on mobile
          }}
        >
          {/* Background Image */}
          <Image
            src="/reality-slider/legacy.webp"
            alt="Traditional film production set with large crew and equipment"
            fill
            className="object-cover object-center"
            sizes="100vw"
            draggable={false}
          />
          {/* Gradient Overlay - Dark to Transparent from left to center */}
          <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/70 to-transparent z-0" />

          <div className="relative z-10 text-left space-y-3 sm:space-y-6 md:space-y-12 max-w-[45%] sm:max-w-[40%] md:max-w-xl">
            <div className="space-y-1 md:space-y-2">
              <span className="text-red-400 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] sm:text-xs">
                Legacy Production
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-none">
                Friction-Heavy
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

        {/* --- DRAG HANDLE --- */}
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

        {/* Mobile Instructions - Visible only when not dragging */}
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
