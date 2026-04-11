import { Button } from "@base-ui/react/button";
import { ChevronsDown } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import Orb from "@/components/ui/Orb";

export const HeroSection = memo(() => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 snap-start">
      {/* Changed: removed -z-10, kept absolute positioning */}
      <div className="absolute inset-0 pointer-events-auto">
        <Orb
          hoverIntensity={0.42}
          rotateOnHover={true}
          hue={265}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>

      {/* Keep pointer-events-none on foreground */}
      <div className="relative z-10 text-center px-4 max-w-6xl animate-reveal pointer-events-none">
        <span className="font-bold text-cyan-400 tracking-[0.2em] uppercase text-[10px] mb-8 block">
          Full Service Creative Agency
        </span>
        <h1 className="font-headline text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-12 text-white uppercase">
          CINEMATIC AD FILMS <br /> AT{" "}
          <span className="text-gradient">UNPRECEDENTED SPEED</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center pointer-events-auto">
          <Link
            href="https://digitalcovet.com/contact-us/"
            className="btn-primary-gradient text-white px-12 py-5 font-headline font-bold uppercase tracking-widest text-xs transition-all"
          >
            Start Your Campaign
          </Link>
          <Button className="glass-panel text-white hover:bg-white/10 px-12 py-5 font-headline font-bold uppercase tracking-widest text-xs transition-all">
            View Our Reel
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 pointer-events-none">
        <ChevronsDown className="w-10 h-10" />
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
