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
  if (step.id === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="max-w-2xl w-full">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-pulse shrink-0" />
            <span className="font-mono text-cyan-400 text-[10px] sm:text-xs tracking-widest uppercase">
              {step.tagline}
            </span>
          </div>
          <h3 className="font-headline text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-tight leading-tight">
            {step.title}
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base lg:text-xl leading-relaxed">
            {step.description}
          </p>
          {step.prompt && (
            <div className="mt-6 sm:mt-8 font-mono text-[10px] sm:text-xs text-white/40 wrap-break-word bg-white/5 p-3 sm:p-4 rounded-lg border border-white/10">
              {step.prompt}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step.id === 1) {
    return (
      <div className="h-full w-full flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 p-6 sm:p-10 lg:p-16">
        <div className="flex flex-col justify-start lg:justify-center shrink-0">
          <h3 className="font-headline text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 uppercase tracking-tight leading-tight">
            {step.title}
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base lg:text-xl leading-relaxed">
            {step.description}
          </p>
        </div>
        <div className="flex-1 min-h-50 w-full relative overflow-hidden rounded-xl">
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
        className="absolute inset-0 w-full h-full bg-black object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 sm:p-8">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-5 sm:px-10 sm:py-8 lg:p-12 rounded-2xl sm:rounded-3xl text-center w-full max-w-70 sm:max-w-sm lg:max-w-md flex flex-col items-center justify-center shadow-2xl">
          <h3 className="font-headline text-xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tighter">
            {step.title}
          </h3>
          {step.tagline && (
            <p className="text-cyan-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase mt-2 sm:mt-3">
              {step.tagline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

WorkflowStateCard.displayName = "WorkflowStateCard";
