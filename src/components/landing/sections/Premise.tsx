"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_QUERIES } from "@/lib/gsap";

const STATEMENT =
  "Budget used to decide the shot. Location decided the story. Weather decided the schedule. Cinewex removes all three: we direct AI to build any world your brand needs, light it like a feature film and cut it into an ad that sells.";

const FRAMES = [1, 2, 3, 4, 5, 6];

const PILLARS = [
  {
    title: "Zero location fees",
    body: "Studios, cities, coastlines and other planets are generated, not rented.",
  },
  {
    title: "Infinite iterations",
    body: "Change the light, the cast or the ending without paying for a reshoot.",
  },
  {
    title: "Delivery in days",
    body: "Approved brief to graded master in days, not a quarter of the year.",
  },
];

export default function Premise() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root.current ?? undefined);

    mm.add(MOTION_QUERIES.motion, () => {
      // Words grade up from shadow to full exposure as the paragraph is read.
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: "[data-statement]",
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        "[data-strip]",
        { xPercent: 6 },
        {
          xPercent: -28,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-strip]",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="premise"
      ref={root}
      className="relative overflow-hidden py-28 md:py-44"
    >
      <div className="container-cine">
        <h2 className="max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1] font-semibold tracking-[-0.03em] text-balance-pretty">
          The only limit left is the idea.
        </h2>
        <p
          data-statement
          className="mt-14 max-w-5xl font-display text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.2] font-medium tracking-[-0.015em] md:mt-20"
        >
          {STATEMENT.split(" ").map((word, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: words repeat; order is fixed
            <span key={i} data-word>
              {word}{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-20 md:mt-32" aria-hidden="true">
        <div data-strip className="flex w-max gap-4 pl-[8vw] md:gap-6">
          {FRAMES.map((n) => (
            <figure key={n} className="w-[56vw] shrink-0 md:w-[24vw]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-frame bg-surface">
                <Image
                  src={`/headline/${n}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 24vw, 56vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="container-cine mt-20 grid gap-10 md:mt-28 md:grid-cols-3 md:gap-8">
        {PILLARS.map((pillar) => (
          <div key={pillar.title} className="border-t border-line-strong pt-5">
            <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              {pillar.title}
            </h3>
            <p className="mt-2 max-w-sm text-fg-muted">{pillar.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
