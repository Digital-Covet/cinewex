import { Avatar } from "@base-ui/react/avatar";
import { Quote } from "lucide-react";
import { memo } from "react";
import { CLIENT_BRANDS, TESTIMONIAL } from "@/constants/landing/clients";
import type { ClientBrand } from "@/types/landing";
import { MarqueeScroll } from "../common/MarqueeScroll";

export const TestimonialsSection = memo(() => {
  const renderClientBrand = (client: ClientBrand) => (
    <span className="font-headline text-4xl font-bold hover:text-white transition-colors cursor-default tracking-tighter">
      {client.name}
    </span>
  );

  return (
    <section className="min-h-screen py-32 bg-zinc-950/50 overflow-hidden border-y border-white/5 snap-start">
      <MarqueeScroll items={CLIENT_BRANDS} renderItem={renderClientBrand} />

      <div className="max-w-5xl mx-auto px-8 mt-32 text-center">
        <div className="relative">
          <Quote className="text-cyan-400 w-16 h-16 opacity-20 absolute -top-16 -left-16" />
          <p className="font-headline text-2xl md:text-5xl font-light leading-tight text-white tracking-tight">
            "{TESTIMONIAL.quote}"
          </p>
          <div className="mt-16 flex flex-col items-center">
            <Avatar.Root className="w-20 h-20 rounded-full border border-white/20 grayscale mb-6">
              <Avatar.Image
                src={TESTIMONIAL.avatarPath}
                alt={`${TESTIMONIAL.author}, ${TESTIMONIAL.role}`}
                className="rounded-full"
              />
            </Avatar.Root>
            <p className="font-headline font-bold text-xl tracking-tight">
              {TESTIMONIAL.author}
            </p>
            <p className="font-bold text-[10px] tracking-[0.2em] text-zinc-500 uppercase mt-2">
              {TESTIMONIAL.role}, {TESTIMONIAL.company}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = "TestimonialsSection";
