"use client";

import { ChevronsDown } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo } from "react";

const Orb = dynamic(() => import("@/components/ui/Orb"), {
  ssr: false,
  loading: () => null,
});

export const HeroSection = memo(() => {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden pt-20">
      {/* Cheap painted fallback underneath the WebGL orb */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(120, 82, 210, 0.35) 0%, rgba(36, 28, 70, 0.18) 35%, transparent 65%)",
        }}
      />
      <div className="absolute inset-0 w-full h-full">
        <Orb
          hoverIntensity={0.42}
          rotateOnHover={true}
          hue={265}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl animate-reveal pointer-events-none">
        <span className="font-bold text-cyan-400 tracking-[0.2em] uppercase text-[10px] mb-8 block">
          AI-Powered Creative Studio for Brands
        </span>
        <h1 className="font-headline text-4xl md:text-7xl font-bold leading-tight md:leading-[0.9] tracking-tighter mb-12 text-white uppercase">
          CINEMATIC AI AD FILMS <br /> BUILT FOR{" "}
          <span className="text-gradient">BRANDS THAT MOVE FAST</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center pointer-events-auto">
          <Link
            href="https://tally.so/r/2EgGgL"
            className="btn-primary-gradient text-white px-12 py-5 font-headline font-bold uppercase tracking-widest text-xs transition-all w-full max-w-xs md:w-auto text-center"
          >
            Start Your Campaign
          </Link>
          <Link
            href="https://www.youtube.com/@Cinewex"
            className="glass-panel text-white hover:bg-white/10 px-12 py-5 font-headline font-bold uppercase tracking-widest text-xs transition-all w-full max-w-xs md:w-auto"
          >
            View Our Videos
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          document
            .getElementById("headline-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hover:opacity-60 cursor-pointer transition-opacity"
        aria-label="Scroll to next section"
      >
        <ChevronsDown className="w-10 h-10" />
      </button>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
