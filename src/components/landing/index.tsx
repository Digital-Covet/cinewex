"use client";

import type React from "react";
import { lazy, Suspense } from "react";
import { Footer } from "./common/Footer";
import { Navigation } from "./common/Navigation";
import HeadlineSection from "./sections/HeadlineSection";
import { HeroSection } from "./sections/HeroSection";

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

const SectionFallback = ({
  className = "min-h-screen",
}: {
  readonly className?: string;
}) => <div className={`${className} bg-[#0A0A0C]`} aria-hidden="true" />;

const CinewexLanding: React.FC = () => {
  return (
    <div className="selection:bg-primary-container selection:text-on-primary-container flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <HeadlineSection />
        <Suspense fallback={<SectionFallback />}>
          <RealitySliderSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <PortfolioSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <WorkflowSection />
        </Suspense>
        <Suspense fallback={<SectionFallback className="min-h-[60vh]" />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default CinewexLanding;
