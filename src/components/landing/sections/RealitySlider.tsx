"use client";

import { Check, ChevronsLeftRight, X } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap, MOTION_QUERIES } from "@/lib/gsap";
import Viewfinder from "../Viewfinder";

const LEGACY = [
  "High overhead costs",
  "Location logistics",
  "Months of waiting",
];
const CINEWEX = [
  "Infinite iterations",
  "Zero location fees",
  "Delivery in days",
];

const clamp = (n: number) => Math.min(100, Math.max(0, n));

export default function RealitySlider() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const [position, setPosition] = useState(50);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root.current ?? undefined);

    mm.add(MOTION_QUERIES.motion, () => {
      gsap.fromTo(
        frame.current,
        { scale: 0.9 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        },
      );

      // One demo sweep the first time the frame is in view, unless the visitor got there first.
      const proxy = { value: 50 };
      gsap
        .timeline({
          defaults: { ease: "power2.inOut", duration: 0.9 },
          onUpdate: () => {
            if (!touched.current) setPosition(proxy.value);
          },
          scrollTrigger: {
            trigger: frame.current,
            start: "top 55%",
            once: true,
            toggleActions: "play none none none",
          },
        })
        .to(proxy, { value: 78 })
        .to(proxy, { value: 24 })
        .to(proxy, { value: 50, duration: 0.7 });
    });

    return () => mm.revert();
  }, []);

  const moveTo = (clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const steps: Record<string, number> = {
      ArrowLeft: -5,
      ArrowDown: -5,
      ArrowRight: 5,
      ArrowUp: 5,
    };
    if (event.key in steps) {
      event.preventDefault();
      touched.current = true;
      setPosition((p) => clamp(p + steps[event.key]));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      touched.current = true;
      setPosition(event.key === "Home" ? 0 : 100);
    }
  };

  return (
    <section id="compare" ref={root} className="py-24 md:py-36">
      <div className="container-cine">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-3xl font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-semibold tracking-[-0.03em] text-balance-pretty">
              Same brief. Two ways to shoot it.
            </h2>
          </div>
          <p className="max-w-sm text-fg-muted">
            Drag the frame to compare a traditional production with the Cinewex
            pipeline.
          </p>
        </div>

        <div
          ref={frame}
          className="relative mt-12 aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden rounded-frame bg-surface select-none md:mt-16 md:aspect-[2.39/1]"
          onPointerDown={(e) => {
            dragging.current = true;
            touched.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            moveTo(e.clientX);
          }}
          onPointerMove={(e) => {
            if (dragging.current) moveTo(e.clientX);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
        >
          <Image
            src="/reality-slider/legacy.webp"
            alt="A traditional film crew with camera dolly, lighting rigs and a location set"
            fill
            sizes="(min-width: 1440px) 1344px, 92vw"
            className="pointer-events-none object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          >
            <Image
              src="/reality-slider/cinewex-way.webp"
              alt="A single Cinewex editor generating and cutting scenes at a desk"
              fill
              sizes="(min-width: 1440px) 1344px, 92vw"
              className="pointer-events-none object-cover"
            />
          </div>

          <span className="slate absolute top-4 left-4 rounded-control bg-canvas/75 px-2.5 py-1.5 text-fg backdrop-blur">
            Legacy production
          </span>
          <span className="slate absolute top-4 right-4 rounded-control bg-gold px-2.5 py-1.5 text-gold-ink">
            The Cinewex way
          </span>
          <Viewfinder className="inset-4 top-14 md:inset-6 md:top-16" />

          <div
            className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-fg"
            style={{ left: `${position}%` }}
          >
            <button
              type="button"
              role="slider"
              aria-label="Comparison position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              aria-valuetext={`${Math.round(position)}% legacy production`}
              onKeyDown={onKeyDown}
              className="pointer-events-auto absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-fg bg-canvas/80 text-fg backdrop-blur transition-colors hover:bg-gold hover:text-gold-ink"
            >
              <ChevronsLeftRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Legacy Production{" "}
              <span className="text-fg-muted">Slow &amp; Expensive</span>
            </h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {LEGACY.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 py-3.5 text-fg-muted"
                >
                  <X aria-hidden="true" className="size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              The Cinewex Way{" "}
              <span className="text-gold">AI-Powered Efficiency</span>
            </h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {CINEWEX.map((item) => (
                <li key={item} className="flex items-center gap-3 py-3.5">
                  <Check
                    aria-hidden="true"
                    className="size-4 shrink-0 text-gold"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
