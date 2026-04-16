"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DecryptedText from "@/components/ui/DecryptedText";

const images = [
  "/headline/1.webp",
  "/headline/2.webp",
  "/headline/3.webp",
  "/headline/4.webp",
  "/headline/5.webp",
  "/headline/6.webp",
];

export default function HeadlineSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getImageClasses = (index: number) => {
    const total = images.length;
    const centerIndex = activeIndex;
    const leftIndex = (activeIndex - 1 + total) % total;
    const rightIndex = (activeIndex + 1) % total;

    // Responsive base classes: smaller on mobile, larger on md+
    const baseClasses =
      "absolute w-48 h-72 md:w-64 md:h-96 object-cover rounded-lg shadow-2xl transition-all duration-700 ease-in-out";

    if (index === centerIndex) {
      return `${baseClasses} z-30 scale-100 translate-x-0 opacity-100`;
    } else if (index === leftIndex) {
      // Responsive translate: smaller offset on mobile, larger on md+
      return `${baseClasses} z-10 scale-90 -translate-x-20 md:-translate-x-32 opacity-60`;
    } else if (index === rightIndex) {
      return `${baseClasses} z-10 scale-90 translate-x-20 md:translate-x-32 opacity-60`;
    }

    return `${baseClasses} z-0 scale-75 translate-x-0 opacity-0 pointer-events-none`;
  };

  return (
    <section className="max-w-screen-2xl min-h-screen lg:h-screen flex items-center py-12 md:py-16 px-4 md:px-8 mb-8 shrink-0 snap-start bg-zinc-950">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column */}
        <div className="order-2 lg:order-1">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white uppercase max-w-4xl leading-none">
            <DecryptedText
              animateOn="view"
              text="Break the Boundaries of Budget and Physics."
              speed={40}
              maxIterations={10}
              sequential
              resetOnReenter
            />
            <span className="text-zinc-600 block mt-2">
              <DecryptedText
                text="We don't shoot on location; we generate worlds."
                animateOn="view"
                speed={40}
                resetOnReenter
                maxIterations={10}
                sequential
              />
            </span>
          </h2>
        </div>

        {/* Right Column - Dynamic Images */}
        <div className="relative h-80 sm:h-96 md:h-112 lg:h-125 w-full flex items-center justify-center overflow-hidden order-1 lg:order-2 mb-8 lg:mb-0">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Creative visualization ${index + 1}`}
              className={getImageClasses(index)}
              width={1696}
              height={2528}
              priority={index <= 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
