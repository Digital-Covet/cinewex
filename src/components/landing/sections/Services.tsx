"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { SERVICES } from "@/constants/landing";
import { gsap, MOTION_QUERIES } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root.current ?? undefined);

    // Desktop: pin the reel and let scroll step through each service.
    mm.add(MOTION_QUERIES.desktop, () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SERVICES.length * 60}%`,
          pin: true,
          onUpdate: (self) => {
            setActive(
              Math.min(
                SERVICES.length - 1,
                Math.floor(self.progress * SERVICES.length),
              ),
            );
          },
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="services"
      ref={root}
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {SERVICES.map((service, i) => (
          <Image
            key={service.title}
            src={service.image}
            alt=""
            fill
            sizes="100vw"
            className={cn(
              "object-cover transition-[opacity,transform] duration-700 ease-cine motion-reduce:transition-none",
              i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-canvas via-canvas/80 to-canvas/25" />
        <div className="absolute inset-0 bg-linear-to-t from-canvas via-transparent to-canvas/60" />
      </div>

      <div className="container-cine">
        <p className="slate">Portfolio Exhibition</p>
        <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-semibold tracking-[-0.03em]">
          Our services
        </h2>

        <ul className="mt-10 max-w-3xl border-t border-line md:mt-14">
          {SERVICES.map((service, i) => {
            const isActive = i === active;
            return (
              <li key={service.title} className="border-b border-line">
                <button
                  type="button"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-baseline gap-5 py-5 text-left md:gap-8 md:py-6"
                >
                  <span
                    className={cn(
                      "slate w-8 shrink-0 tabular-nums transition-colors",
                      isActive && "text-gold",
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span className="flex flex-col">
                    <span
                      className={cn(
                        "font-display text-[clamp(1.6rem,3.6vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.025em] transition-colors duration-300",
                        isActive
                          ? "text-fg"
                          : "text-fg/40 group-hover:text-fg/70",
                      )}
                    >
                      {service.title}
                    </span>
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-cine motion-reduce:transition-none",
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-lg pt-3 text-fg/80 md:text-lg">
                          {service.description}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p
        aria-hidden="true"
        className="slate absolute right-[clamp(1rem,4vw,3rem)] bottom-8 text-fg tabular-nums"
      >
        0{active + 1} / 0{SERVICES.length}
      </p>
    </section>
  );
}
