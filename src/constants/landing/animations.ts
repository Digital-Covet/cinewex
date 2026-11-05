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
    color: "bg-cyan-500/10",
    blur: "blur-[150px]",
  },
  STEP_1: {
    width: "w-[900px]",
    height: "h-[900px]",
    color: "bg-purple-500/10",
    blur: "blur-[180px]",
  },
  STEP_2: {
    width: "w-[1000px]",
    height: "h-[1000px]",
    color: "bg-cyan-500/20",
    blur: "blur-[200px]",
  },
} as const;

export const SLIDER_CONSTRAINTS = {
  MIN_POSITION: 0,
  MAX_POSITION: 100,
  DEFAULT_POSITION: 50,
} as const;
