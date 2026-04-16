import type { RefObject } from "react";
import { memo, useRef } from "react";
import BorderGlow from "@/components/ui/BorderGlow";
import { WORKFLOW_STEPS } from "@/constants/landing/workflow";
import { useScrollWorkflow } from "@/hooks/landing/useScrollWorkflow";
import { ProgressIndicator } from "../workflow/ProgressIndicator";
import { WorkflowStateCard } from "../workflow/WorkflowStateCard";

interface WorkflowSectionProps {
  containerRef?: RefObject<HTMLElement | null>;
}

export const WorkflowSection = memo(
  ({ containerRef }: WorkflowSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { activeStep, orbConfig } = useScrollWorkflow(
      sectionRef,
      containerRef,
    );

    const getDirection = (stepId: number): "prev" | "current" | "next" => {
      if (stepId === activeStep) return "current";
      return stepId < activeStep ? "prev" : "next";
    };

    return (
      <div
        ref={sectionRef}
        id="workflow"
        className="relative h-[400vh] bg-[#0A0A0C] overflow-visible snap-start"
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-3 py-4 sm:px-5 sm:py-6 lg:p-8 overflow-hidden">
          {/* Background orb — unchanged */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${orbConfig.width} ${orbConfig.height} ${orbConfig.color} ${orbConfig.blur} rounded-full transition-all duration-1000`}
            />
          </div>

          {/* Section header */}
          <div className="relative z-10 text-center mb-4 sm:mb-8 lg:mb-16 px-4 w-full max-w-6xl">
            <span className="text-cyan-400 font-bold tracking-[0.5em] uppercase text-[9px] sm:text-[10px] block mb-2 sm:mb-4">
              The Engine
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white uppercase">
              Neural Workflow
            </h2>
          </div>

          {/*
           * Card container — the critical fix.
           *
           * Desktop:  aspect-video (16/9) — cinematic, same as before.
           * Tablet:   aspect-[3/2]        — slightly taller, step 1 stacked layout fits.
           * Mobile:   aspect-[4/3]        — tall enough for all three states to breathe.
           *
           * We also guard with a min-height so very short landscape phones still work.
           */}
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
            className="relative z-10 w-full max-w-5xl aspect-4/3 sm:aspect-3/2 lg:aspect-video min-h-70 rounded-3xl p-1 overflow-hidden"
          >
            <div className="w-full h-full bg-black rounded-[20px] overflow-hidden relative">
              {WORKFLOW_STEPS.map((step) => (
                <WorkflowStateCard
                  key={step.id}
                  step={step}
                  isActive={step.id === activeStep}
                  direction={getDirection(step.id)}
                />
              ))}
            </div>
          </BorderGlow>

          <ProgressIndicator
            activeStep={activeStep}
            totalSteps={WORKFLOW_STEPS.length}
          />
        </div>
      </div>
    );
  },
);

WorkflowSection.displayName = "WorkflowSection";
