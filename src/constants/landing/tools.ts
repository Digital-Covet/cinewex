import type { ToolBrand } from "@/types/landing";

export const TOOLS_USED: readonly ToolBrand[] = [
  {
    id: "after-effect",
    name: "After Effects",
    imagePath: "/tools/after-effect.svg",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    imagePath: "/tools/elevenlabs.svg",
  },
  {
    id: "flow",
    name: "Flow",
    imagePath: "/tools/flow.svg",
  },
  {
    id: "grok",
    name: "Grok",
    imagePath: "/tools/grok.svg",
  },
  {
    id: "pixabay",
    name: "Pixabay",
    imagePath: "/tools/pixabay.svg",
  },
  {
    id: "premiere-pro",
    name: "Premiere Pro",
    imagePath: "/tools/premier-pro.svg",
  },
  {
    id: "qwen-ai",
    name: "Qwen AI",
    imagePath: "/tools/qwen-ai.svg",
  },
  {
    id: "roboneo",
    name: "Roboneo",
    imagePath: "/tools/roboneo.svg",
  },
  {
    id: "open-art",
    name: "Open Art",
    imagePath: "/tools/open-art.svg",
  },
  {
    id: "higgsfield",
    name: "HiggsField",
    imagePath: "/tools/higgsfield.svg",
  },
] as const;
