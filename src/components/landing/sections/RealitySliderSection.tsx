import { UnfoldVertical } from "lucide-react";
import type React from "react";
import { memo, useRef } from "react";
import FuzzyText from "@/components/ui/FuzzyText";
import Hyperspeed, { type HyperspeedOptions } from "@/components/ui/Hyperspeed";
import Noise from "@/components/ui/Noise";
import { useSliderPosition } from "@/hooks/landing/useSliderPosition";

const HYPERSPEED_OPTIONS = {
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [12, 80],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 526344,
    islandColor: 657930,
    background: 0,
    shoulderLines: 1250072,
    brokenLines: 1250072,
    leftCars: [14177983, 6770850, 12732332],
    rightCars: [242627, 941733, 3294549],
    sticks: 242627,
  },
} satisfies Partial<HyperspeedOptions>;

const ModernBackground = memo(() => (
  <div className="absolute inset-0">
    {/* <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} /> */}
    <video
      className="absolute inset-0 w-full h-full"
      autoPlay
      loop
      muted
      playsInline
      src="https://videocdn.cdnpk.net/videos/23a8c9a9-4be1-569e-88aa-cd1bc128fcdc/horizontal/previews/watermarked/large.mp4"
    />
  </div>
));
ModernBackground.displayName = "ModernBackground";

const ADVANTAGE_FEATURES = [
  {
    id: "iterations",
    title: "Infinite Iterations",
    description: "Explore a thousand styles in seconds.",
    color: "cyan",
  },
  {
    id: "location",
    title: "Zero Location Fees",
    description: "From Mars to Metropolis, no travel needed.",
    color: "purple",
  },
  {
    id: "delivery",
    title: "Delivery in Days",
    description: "Collapse month-long schedules into 72 hours.",
    color: "cyan",
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
  const { position, setPosition, handleMove } = useSliderPosition(sliderRef);

  return (
    <section
      className="h-screen bg-black overflow-hidden flex flex-col snap-start"
      id="advantage"
    >
      <div
        ref={sliderRef}
        className="reality-slider relative w-full h-full cursor-ew-resize group"
        onMouseMove={handleMove}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            setPosition((p) => Math.max(0, p - 5));
          } else if (e.key === "ArrowRight") {
            setPosition((p) => Math.min(100, p + 5));
          }
        }}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={position}
        tabIndex={0}
        style={{ "--position": `${position}%` } as React.CSSProperties}
      >
        {/* --- MODERN SIDE (right panel, clips in from the right) --- */}
        <div
          className="absolute inset-0 bg-black flex items-center justify-end px-12 md:px-32 overflow-hidden"
          style={{
            clipPath: `inset(0 0 0 ${position}%)`,
            willChange: "clip-path",
          }}
        >
          <ModernBackground />

          <div className="absolute inset-0 " />

          <div className="relative z-10 text-right space-y-12 max-w-xl">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[10px]">
                The Cinewex Way
              </span>
              <h3 className="font-headline text-5xl font-bold text-white uppercase italic">
                Hyper-Efficiency
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {ADVANTAGE_FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className={`glass-panel p-6 rounded-2xl border-${feature.color}-500/30`}
                >
                  <p
                    className={`text-${feature.color}-400 font-bold text-sm tracking-widest uppercase mb-1`}
                  >
                    {feature.title}
                  </p>
                  <p className="text-white/70 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- LEGACY SIDE (left panel, clips in from the left) --- */}
        <div
          className="traditional-side absolute inset-y-0 left-0 bg-black flex items-center px-12 md:px-32 overflow-hidden border-r border-white/20"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            width: "100%",
          }}
        >
          <div className="absolute inset-0">
            <Noise
              patternSize={500}
              patternScaleX={5}
              patternScaleY={5}
              patternRefreshInterval={2}
              patternAlpha={25}
            />
          </div>
          <div className="relative z-10 space-y-12 max-w-xl">
            <div className="space-y-2">
              <span className="font-bold tracking-[0.3em] uppercase text-[10px]">
                Legacy Production
              </span>
              <h3 className="font-headline text-5xl font-bold leading-none">
                <FuzzyText
                  fontSize="clamp(1rem, 4vw, 4rem)"
                  baseIntensity={0.2}
                  hoverIntensity={0.5}
                  enableHover
                  className="block relative -left-16 my-4"
                >
                  Friction-Heavy
                </FuzzyText>
              </h3>
            </div>
            <div className="space-y-6">
              {LEGACY_CONSTRAINTS.map((constraint) => (
                <div
                  key={constraint.id}
                  className="border-l-2 border-zinc-700 pl-6"
                >
                  <p className="font-bold text-xs uppercase tracking-widest">
                    {constraint.title}
                  </p>
                  <p className="text-[10px] mt-1">{constraint.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- DRAG HANDLE --- */}
        <div
          className="slider-handle absolute inset-y-0 w-1 bg-white/50 backdrop-blur z-20 flex items-center justify-center"
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-4 border-black/10">
            <UnfoldVertical className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
});

RealitySliderSection.displayName = "RealitySliderSection";
