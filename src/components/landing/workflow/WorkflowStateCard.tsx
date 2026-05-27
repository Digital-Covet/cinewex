import { Video } from "@imagekit/next";
import Image from "next/image";
import { memo } from "react";
import Stack from "@/components/ui/Stack";
import type { WorkflowStep } from "@/types/landing";

interface WorkflowStateCardProps {
  readonly step: WorkflowStep;
}

const images = [
  "/storyboards/11.webp",
  "/storyboards/10.webp",
  "/storyboards/09.webp",
  "/storyboards/08.webp",
  "/storyboards/07.webp",
  "/storyboards/06.webp",
  "/storyboards/05.webp",
  "/storyboards/04.webp",
  "/storyboards/03.webp",
  "/storyboards/02.webp",
  "/storyboards/01.webp",
];

export const WorkflowStateCard = memo<WorkflowStateCardProps>(({ step }) => {
  // ---------- Step 0: The Neural Brief ----------
  if (step.id === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center p-5 sm:p-8 lg:p-12">
        <div className="max-w-xl w-full">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-pulse shrink-0" />
            <span className="font-mono text-cyan-400 text-[9px] sm:text-xs tracking-widest uppercase">
              {step.tagline}
            </span>
          </div>

          <h3 className="font-headline text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 uppercase tracking-tight leading-tight">
            {step.title}
          </h3>

          <p className="text-zinc-500 text-sm sm:text-base lg:text-xl leading-relaxed">
            {step.description}
          </p>

          {step.prompt && (
            <div className="hidden xs:block mt-4 sm:mt-6 lg:mt-8 font-mono text-[10px] sm:text-xs text-white/20 break-all">
              {step.prompt}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------- Step 1: Visual Sculpting ----------
  if (step.id === 1) {
    return (
      <div className="h-full w-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col justify-center">
          <h3 className="font-headline text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-6 uppercase tracking-tight leading-tight">
            {step.title}
          </h3>
          <p className="text-zinc-500 text-sm sm:text-base lg:text-xl leading-relaxed line-clamp-3 lg:line-clamp-none">
            {step.description}
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <Stack
            randomRotation={false}
            sensitivity={200}
            sendToBackOnClick={true}
            cards={images.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`storyboard-${i + 1}`}
                width={1680}
                height={1739}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ))}
            autoplay
            autoplayDelay={2000}
            pauseOnHover={false}
          />
        </div>
      </div>
    );
  }

  // ---------- Step 2: Final Delivery ----------
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Video
        autoPlay
        muted
        loop
        preload="none"
        playsInline
        urlEndpoint="https://ik.imagekit.io/nyfnukger"
        src="/final_ai_video.mp4"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full bg-black object-contain lg:object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-start pt-5 sm:pt-8 lg:justify-center lg:pt-0">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center w-[min(90%,340px)] sm:w-auto">
          <h3 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 uppercase tracking-tighter">
            {step.title}
          </h3>
          <p className="text-cyan-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
            {step.tagline}
          </p>
        </div>
      </div>
    </div>
  );
});

WorkflowStateCard.displayName = "WorkflowStateCard";
