export const SCROLL_THRESHOLDS = {
  STEP_1: 0.52,
  STEP_2: 0.74,
} as const;

export const TRANSITION_DURATIONS = {
  BACKGROUND: 600,
  WORKFLOW: 1000,
  HOVER: 500,
} as const;

export const ORB_CONFIGS = {
  STEP_0: {
    width: "w-[800px]",
    height: "h-[800px]",
    gradient:
      "radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(6, 182, 212, 0.07) 38%, transparent 70%)",
  },
  STEP_1: {
    width: "w-[900px]",
    height: "h-[900px]",
    gradient:
      "radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(168, 85, 247, 0.07) 38%, transparent 70%)",
  },
  STEP_2: {
    width: "w-[1000px]",
    height: "h-[1000px]",
    gradient:
      "radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(6, 182, 212, 0.09) 40%, transparent 72%)",
  },
} as const;

export const SLIDER_CONSTRAINTS = {
  MIN_POSITION: 0,
  MAX_POSITION: 100,
  DEFAULT_POSITION: 50,
} as const;
