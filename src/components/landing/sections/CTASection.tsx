import Link from "next/link";
import { memo } from "react";
import { AmbientOrb } from "../common/AmbientOrb";
import { Footer } from "../common/Footer";

export const CTASection = memo(() => {
  return (
    <section className="relative snap-start min-h-screen flex flex-col overflow-hidden">
      {/* Background Ambient Effects */}
      <AmbientOrb
        position="center"
        color="cyan"
        size="md"
        className="left-1/4"
      />
      <AmbientOrb
        position="center"
        color="purple"
        size="md"
        className="right-1/4"
      />

      {/* CTA Content - Flex grow to center itself in available space */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 py-60">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-headline text-6xl md:text-9xl font-bold tracking-tighter text-white mb-16 leading-none uppercase">
            READY TO <br />
            SCALE YOUR STORY?
          </h2>
          <div className="max-w-xl mx-auto">
            <Link
              href="https://digitalcovet.com/contact-us/"
              className="font-headline font-bold uppercase tracking-widest transition-all w-full rounded-2xl btn-primary-gradient text-white px-12 py-8 text-sm md:text-base inline-block"
            >
              Let's Build Your Campaign
            </Link>
          </div>
          <p className="mt-10 font-bold text-[10px] text-zinc-500 tracking-[0.3em] uppercase">
            Accepting new brand partnerships for Q1 2025
          </p>
        </div>
      </div>

      {/* Footer sits naturally at bottom, no forced full-height */}
      <Footer />
    </section>
  );
});

CTASection.displayName = "CTASection";
