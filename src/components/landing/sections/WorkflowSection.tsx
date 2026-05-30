import { memo, useEffect, useState } from "react";
import BorderGlow from "@/components/ui/BorderGlow";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ORB_CONFIGS } from "@/constants/landing/animations";
import { WORKFLOW_STEPS } from "@/constants/landing/workflow";
import { ProgressIndicator } from "../workflow/ProgressIndicator";
import { WorkflowStateCard } from "../workflow/WorkflowStateCard";

export const WorkflowSection = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setActiveStep(api.selectedScrollSnap());
    };
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const orbConfig =
    ORB_CONFIGS[`STEP_${activeStep}` as keyof typeof ORB_CONFIGS] ??
    ORB_CONFIGS.STEP_0;

  return (
    <div
      id="workflow"
      className="relative bg-[#0A0A0C] flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:p-16 overflow-hidden min-h-screen"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 ${orbConfig.width} ${orbConfig.height} ${orbConfig.color} ${orbConfig.blur}`}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-10 lg:mb-16 px-4 w-full max-w-6xl">
        <span className="text-cyan-400 font-bold tracking-[0.5em] uppercase text-[10px] sm:text-xs block mb-3 sm:mb-4">
          The Engine
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white uppercase">
          Neural Workflow
        </h2>
      </div>

      {/* Carousel Container */}
      <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="#060010"
        borderRadius={28}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={["#c084fc", "#f472b6", "#38bdf8"]}
        className="relative z-10 w-full max-w-5xl h-120 sm:h-140 lg:h-auto lg:aspect-video rounded-3xl p-1 overflow-hidden"
      >
        <div className="w-full h-full bg-black rounded-3xl overflow-hidden relative">
          <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent className="h-full">
              {WORKFLOW_STEPS.map((step) => (
                <CarouselItem key={step.id} className="h-full">
                  <WorkflowStateCard step={step} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </BorderGlow>

      {/* Progress Dots */}
      <ProgressIndicator
        activeStep={activeStep}
        totalSteps={WORKFLOW_STEPS.length}
        onDotClick={(index) => api?.scrollTo(index)}
      />
    </div>
  );
});

WorkflowSection.displayName = "WorkflowSection";
