import type { WorkflowStep } from "@/types/landing";

export const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    id: 0,
    title: "The Neural Brief",
    tagline: "Initializing Strategy...",
    description:
      "We sync with your brand DNA. Our AI models ingest your core values to output a creative strategy that hits 10.4x faster than traditional agencies.",
    prompt:
      "> PROMPT: /imagine cinematic high-fashion automotive concept, desert moon setting, 8k --v 6",
    imagePath: "/assets/workflow-brief.jpg",
    activeColor: "cyan",
  },
  {
    id: 1,
    title: "Visual Sculpting",
    tagline: "Rendering Concepts...",
    description:
      " From mood boards to high-fidelity storyboards in real time. We explore multiple creative directions in parallel - you pick the one that moves your brand.",
    imagePath: "/assets/storyboard.jpg",
    activeColor: "purple",
  },
  {
    id: 2,
    title: "Final Delivery",
    tagline: "",
    description: "",
    imagePath: "",
    activeColor: "cyan",
  },
] as const;
