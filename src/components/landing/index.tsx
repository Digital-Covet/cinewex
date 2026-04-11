"use client";

import type React from "react";
import { lazy, Suspense, useRef } from "react";
import { Footer } from "./common/Footer";
import { Navigation } from "./common/Navigation";
import HeadlineSection from "./sections/HeadlineSection";
import { HeroSection } from "./sections/HeroSection";

// Lazy load below-the-fold sections
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
  import("./sections/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
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
    <div className="selection:bg-primary-container selection:text-on-primary-container overflow-x-clip flex flex-col h-screen">
      <Navigation />

      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto snap-y snap-mandatory"
      >
        <HeroSection />
        <Suspense fallback={<LoadingFallback />}>
          <HeadlineSection />
          <RealitySliderSection />
          <PortfolioSection />
          <WorkflowSection containerRef={mainRef} />
          <TestimonialsSection />
          <CTASection />
        </Suspense>
      </main>
    </div>
  );
};

export default CinewexLanding;
