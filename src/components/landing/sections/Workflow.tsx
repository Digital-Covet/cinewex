"use client";

import { Video } from "@imagekit/next";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { WORKFLOW_STEPS } from "@/constants/landing";
import { gsap, MOTION_QUERIES } from "@/lib/gsap";
import Viewfinder from "../Viewfinder";

export default function Workflow() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root.current ?? undefined);

    // The delivery reel only plays while it is actually in view. An observer
    // also catches it sliding in sideways on the pinned desktop track.
    mm.add(MOTION_QUERIES.motion, () => {
      const el = video.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) el.play().catch(() => {});
          else el.pause();
        },
        { threshold: 0.25 },
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
        el.pause();
      };
    });

    // Desktop: pin the section and run the steps past like a timeline.
    mm.add(MOTION_QUERIES.desktop, () => {
      const distance = () =>
        (track.current?.scrollWidth ?? 0) - window.innerWidth;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        .to(track.current, { x: () => -distance(), ease: "none" }, 0)
        .fromTo(
          "[data-progress]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0,
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="process"
      ref={root}
      className="relative overflow-hidden py-24 md:flex md:h-svh md:flex-col md:justify-center md:py-0"
    >
      <div
        ref={track}
        className="flex flex-col gap-16 px-[clamp(1rem,4vw,3rem)] md:w-max md:flex-row md:items-center md:gap-[6vw]"
      >
        <div className="md:w-[34vw] md:shrink-0">
          <h2 className="font-display text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1] font-semibold tracking-[-0.03em] text-balance-pretty">
            From brief to broadcast in three moves.
          </h2>
          <p className="mt-6 max-w-md text-fg-muted md:text-lg">
            No call sheets, no location scouts, no overtime. Here is exactly
            what happens after you send us a brief.
          </p>
        </div>

        {WORKFLOW_STEPS.map((step, i) => (
          <article
            key={step.title}
            className="grid gap-6 md:w-[62vw] md:shrink-0 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10"
          >
            <div className="relative aspect-video overflow-hidden rounded-frame bg-surface md:aspect-[4/3]">
              <Image
                src={step.image}
                alt=""
                fill
                sizes="(min-width: 768px) 34vw, 92vw"
                className="object-cover"
              />
              {"video" in step && (
                // Finished master, streamed from ImageKit over its still.
                <Video
                  ref={video}
                  src={step.video}
                  poster={step.image}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${step.title}: a finished Cinewex ad`}
                  className="absolute inset-0 size-full object-cover"
                />
              )}
              <Viewfinder className="inset-3 md:inset-4" />
            </div>
            <div>
              <span className="font-display text-7xl leading-none font-semibold text-gold/90 tabular-nums md:text-8xl">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-md text-fg-muted md:text-lg md:leading-relaxed">
                {step.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {step.outputs.map((output) => (
                  <li
                    key={output}
                    className="slate rounded-control border border-line-strong px-2.5 py-1.5 text-fg"
                  >
                    {output}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-[clamp(1rem,4vw,3rem)] bottom-10 hidden h-px bg-line md:block"
      >
        <span
          data-progress
          className="block h-full origin-left scale-x-0 bg-gold"
        />
      </div>
    </section>
  );
}
