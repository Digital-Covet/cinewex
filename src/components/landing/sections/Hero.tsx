"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { HEADLINE } from "@/constants/landing";
import { gsap, MOTION_QUERIES } from "@/lib/gsap";
import CtaLink from "../CtaLink";
import Viewfinder from "../Viewfinder";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root.current ?? undefined);

    mm.add(MOTION_QUERIES.motion, () => {
      // Opening titles: lines rise out of their masks, then the rest settles in.
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-bar]", { scaleY: 2.4, duration: 1.4 })
        .from(
          "[data-line]",
          { yPercent: 110, duration: 1.2, stagger: 0.12 },
          0.2,
        )
        .from(
          "[data-fade]",
          { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 },
          0.7,
        );

      // Scroll: the letterbox opens to full frame while the titles drift off.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: true,
          },
        })
        .to("[data-bar]", { scaleY: 0, ease: "none" }, 0)
        .fromTo("[data-media]", { scale: 1.14 }, { scale: 1, ease: "none" }, 0)
        .to(
          "[data-copy]",
          { yPercent: -18, autoAlpha: 0, ease: "power1.in" },
          0.15,
        )
        .to("[data-frame]", { autoAlpha: 0, ease: "none" }, 0);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative h-svh overflow-hidden bg-canvas"
    >
      <div data-media className="absolute inset-0 will-change-transform">
        <Image
          src="/portfolio/ai_product_ads.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/55 to-canvas/30"
      />

      <div
        data-bar
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 origin-top bg-black"
        style={{ height: "var(--letterbox)" }}
      />
      <div
        data-bar
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 origin-bottom bg-black"
        style={{ height: "var(--letterbox)" }}
      />

      <div data-frame className="absolute inset-0 z-10">
        <Viewfinder className="inset-x-[clamp(1rem,4vw,3rem)] top-[calc(var(--letterbox)+1.25rem)] bottom-[calc(var(--letterbox)+1.25rem)]" />{" "}
      </div>

      <div
        data-copy
        className="container-cine relative z-20 flex h-full flex-col justify-end pb-[calc(var(--letterbox)+3.5rem)] md:pb-[calc(var(--letterbox)+4.5rem)]"
      >
        <h1 className="max-w-5xl font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span data-line className={i === 1 ? "block text-gold" : "block"}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
          <p
            data-fade
            className="max-w-xl text-base text-fg/85 md:text-lg md:leading-relaxed"
          >
            Cinewex is an AI creative studio. We make TV commercials, product
            ads and social campaigns for brands, at broadcast quality, delivered
            in days instead of months.
          </p>
          <div data-fade className="flex flex-wrap items-center gap-4">
            <CtaLink>Start your project</CtaLink>
            <a
              href="#services"
              className="inline-flex h-12 items-center rounded-control border border-line-strong px-6 text-base text-fg transition-colors hover:border-fg"
            >
              Explore services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
