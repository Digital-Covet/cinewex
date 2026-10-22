"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { TOOLS } from "@/constants/landing";
import { gsap, MOTION_QUERIES, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function ToolRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={cn(
        "flex shrink-0 items-center gap-4 pr-4",
        hidden && "motion-reduce:hidden",
      )}
    >
      {TOOLS.map((tool) => (
        <li
          key={tool.name}
          className="flex h-20 items-center gap-3 rounded-frame border border-line bg-surface px-6 md:h-24 md:px-8"
        >
          <Image
            src={tool.logo}
            alt=""
            width={32}
            height={32}
            unoptimized
            className="size-7 object-contain md:size-8"
          />
          <span className="font-display text-lg font-medium whitespace-nowrap md:text-xl">
            {tool.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Tools() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root.current ?? undefined);

    mm.add(MOTION_QUERIES.motion, () => {
      const loop = gsap.to(track.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });

      // Scrolling fast spins the reel faster, then it coasts back to speed.
      const boost = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const speed = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 5);
          gsap
            .timeline({ overwrite: true })
            .to(loop, { timeScale: speed, duration: 0.2 })
            .to(loop, { timeScale: 1, duration: 1.2, ease: "power2.out" });
        },
      });

      return () => boost.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="tools" ref={root} className="overflow-hidden py-24 md:py-36">
      <div className="container-cine flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="max-w-3xl font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-semibold tracking-[-0.03em] text-balance-pretty">
            Made with the tools the industry trusts.
          </h2>
        </div>
        <p className="max-w-sm text-fg-muted">
          Industry-standard post-production, paired with the newest generative
          models for image, motion and voice.
        </p>
      </div>

      <div className="mt-14 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-20 motion-reduce:[mask-image:none]">
        <div
          ref={track}
          className="flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-4"
        >
          <ToolRow />
          <ToolRow hidden />
        </div>
      </div>
    </section>
  );
}
