"use client";

import Lenis from "lenis";
import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger scrubs
 * stay in lockstep with the eased scroll position. Skipped entirely when the
 * visitor prefers reduced motion, leaving native scroll in place.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      refresh();
      return () => window.removeEventListener("load", refresh);
    }

    const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    refresh();

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
