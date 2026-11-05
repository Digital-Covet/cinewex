"use client";

import Image from "next/image";
import { memo } from "react";
import { TOOLS_USED } from "@/constants/landing/tools";
import type { ToolBrand } from "@/types/landing";
import { MarqueeScroll } from "../common/MarqueeScroll";

export const ToolsUsedSection = memo(() => {
  const renderToolBrand = (tool: ToolBrand) => (
    <div className="group flex items-center justify-center px-8 py-4 cursor-default text-white">
      <div className="relative h-12 w-auto flex items-center justify-center opacity-60 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-110">
        <Image
          src={tool.imagePath}
          alt={tool.name}
          width={0}
          height={0}
          className="h-full w-auto object-contain"
          unoptimized
        />
      </div>
    </div>
  );

  return (
    <section className="min-h-[60vh] py-24 bg-zinc-950/50 overflow-hidden border-y border-white/5 flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="text-center mb-16">
          <p className="font-bold text-[10px] tracking-[0.3em] text-cyan-400 uppercase mb-4">
            Our Stack
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-light text-white tracking-tight">
            Powered by the best AI and post-production tools in the industry
          </h2>
        </div>
      </div>

      <MarqueeScroll
        items={TOOLS_USED}
        renderItem={renderToolBrand}
        className="w-full"
      />
    </section>
  );
});

ToolsUsedSection.displayName = "ToolsUsedSection";
