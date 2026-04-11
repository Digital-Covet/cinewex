import { type RefObject, useEffect, useMemo, useState } from "react";
import { ORB_CONFIGS, SCROLL_THRESHOLDS } from "@/constants/landing/animations";
import type { OrbConfig } from "@/types/landing";
import { calculateScrollPercentage, throttle } from "@/utils/landing/scroll";

interface UseScrollWorkflowReturn {
  activeStep: number;
  orbConfig: OrbConfig;
}

const getOrbConfigForStep = (step: number): OrbConfig => {
  switch (step) {
    case 0:
      return ORB_CONFIGS.STEP_0;
    case 1:
      return ORB_CONFIGS.STEP_1;
    case 2:
      return ORB_CONFIGS.STEP_2;
    default:
      return ORB_CONFIGS.STEP_0;
  }
};

const calculateActiveStep = (scrollPercent: number): number => {
  if (scrollPercent < SCROLL_THRESHOLDS.STEP_1) return 0;
  if (scrollPercent < SCROLL_THRESHOLDS.STEP_2) return 1;
  return 2;
};

export const useScrollWorkflow = (
  sectionRef: RefObject<HTMLElement | null>,
  containerRef?: RefObject<HTMLElement | null>,
): UseScrollWorkflowReturn => {
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const container = containerRef?.current ?? window;
    const isWindow = container === window;

    const handleScroll = throttle((): void => {
      const scrollPercent = calculateScrollPercentage(
        sectionRef.current,
        container,
      );

      if (scrollPercent < 0 || scrollPercent > 1) return;

      const step = calculateActiveStep(scrollPercent);
      setActiveStep(step);
    }, 16);

    if (isWindow) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [sectionRef, containerRef]);

  const orbConfig = useMemo(
    () => getOrbConfigForStep(activeStep),
    [activeStep],
  );

  return { activeStep, orbConfig };
};
