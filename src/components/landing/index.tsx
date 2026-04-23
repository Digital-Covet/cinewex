"use client";

import type React from "react";
import { lazy, Suspense, useRef } from "react";
import { Navigation } from "./common/Navigation";
import HeadlineSection from "./sections/HeadlineSection";
import { HeroSection } from "./sections/HeroSection";
import { Footer } from "./common/Footer";

const RealitySliderSection = lazy(() =>
  import("./sections/RealitySliderSection").then((m) => ({
    default: m.RealitySliderSection,
  })),
);

const PortfolioSection = lazy(() =>
  import("./sections/PortfolioSection").then((m) => ({
    default: m.PortfolioSection,
  })),
);

const WorkflowSection = lazy(() =>
  import("./sections/WorkflowSection").then((m) => ({
    default: m.WorkflowSection,
  })),
);

const TestimonialsSection = lazy(() =>
  import("./sections/ToolsUsedSection").then((m) => ({
    default: m.ToolsUsedSection,
  })),
);

const CTASection = lazy(() =>
  import("./sections/CTASection").then((m) => ({
    default: m.CTASection,
  })),
);

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0A0A0C]">
    <div className="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
  </div>
);

const CinewexLanding: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);

  return (
    // Fix: Changed from h-screen to min-h-screen. The page should naturally flow, not be forced to exactly 100vh
    <div className="selection:bg-primary-container selection:text-on-primary-container flex flex-col min-h-screen">
      <Navigation />
      {/* Fix: Removed h-screen behavior — main should flow naturally, not be constrained to viewport */}
      <main ref={mainRef} className="flex-1">
        <HeroSection />
        <Suspense fallback={<LoadingFallback />}>
          <HeadlineSection />
          <RealitySliderSection />
          <PortfolioSection />
          <WorkflowSection />
          <TestimonialsSection />
          <CTASection />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default CinewexLanding;
