import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Media queries shared by every scroll scene. */
export const MOTION_QUERIES = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
} as const;

export { gsap, ScrollTrigger };
