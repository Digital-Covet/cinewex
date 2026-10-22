"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_QUERIES } from "@/lib/gsap";
import CtaLink from "../CtaLink";

export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root.current ?? undefined);

    // The letterbox closes back in for the last scene, mirroring the opening.
    mm.add(MOTION_QUERIES.motion, () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        })
        .fromTo("[data-bar]", { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0)
        .fromTo("[data-media]", { scale: 1.2 }, { scale: 1, ease: "none" }, 0)
        .fromTo(
          "[data-copy]",
          { y: 80, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: "power2.out" },
          0.35,
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="relative isolate grid h-svh place-items-center overflow-hidden"
    >
      <div
        data-media
        aria-hidden="true"
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Image
          src="/headline/1.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-radial from-canvas/40 to-canvas" />
      </div>

      <div
        data-bar
        aria-hidden="true"
        className="absolute inset-x-0 top-0 origin-top bg-black"
        style={{ height: "calc(var(--letterbox) * 0.6)" }}
      />
      <div
        data-bar
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 origin-bottom bg-black"
        style={{ height: "calc(var(--letterbox) * 0.6)" }}
      />

      <div data-copy className="container-cine text-center">
        <h2 className="mx-auto max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-balance-pretty">
          Your next commercial starts with a brief.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-fg/85 md:text-lg">
          Tell us what you are launching. We will come back with an approach, a
          timeline and a quote.
        </p>
        <CtaLink size="lg" className="mt-10">
          Start your project
        </CtaLink>
      </div>
    </section>
  );
}
