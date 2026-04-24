import { Video } from "@imagekit/next";
import Image from "next/image";
import { memo } from "react";
import Stack from "@/components/ui/Stack";
import type { WorkflowStep } from "@/types/landing";

interface WorkflowStateCardProps {
  readonly step: WorkflowStep;
  readonly isActive: boolean;
  readonly direction: "prev" | "current" | "next";
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

export const WorkflowStateCard = memo<WorkflowStateCardProps>(
  ({ step, isActive, direction }) => {
    const getTransformClass = (): string => {
      if (isActive) return "translate-y-0 opacity-100";
      if (direction === "prev") return "-translate-y-full opacity-0";
      return "translate-y-full opacity-0";
    };

    // ─── Step 0 — Neural Brief ──────────────────────────────────────────────
    if (step.id === 0) {
      return (
        <div
          className={`workflow-state absolute inset-0 flex items-center justify-center
            p-5 sm:p-8 lg:p-12
            transition-all duration-700 ${getTransformClass()}`}
        >
          <div className="max-w-xl w-full">
            {/* Tagline badge */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="font-mono text-cyan-400 text-[9px] sm:text-xs tracking-widest uppercase">
                {step.tagline}
              </span>
            </div>

            {/* Headline */}
            <h3
              className="font-headline text-xl sm:text-2xl lg:text-4xl font-bold text-white
              mb-3 sm:mb-4 lg:mb-6 uppercase tracking-tight leading-tight"
            >
              {step.title}
            </h3>

            {/* Body copy */}
            <p className="text-zinc-500 text-sm sm:text-base lg:text-xl leading-relaxed">
              {step.description}
            </p>

            {/* Prompt line — hidden on the smallest mobiles to save space */}
            {step.prompt && (
              <div className="hidden xs:block mt-4 sm:mt-6 lg:mt-8 font-mono text-[10px] sm:text-xs text-white/20 break-all">
                {step.prompt}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (step.id === 1) {
      return (
        <div
          className={`workflow-state absolute inset-0 flex items-center justify-center
            p-4 sm:p-6 lg:p-10
            transition-all duration-700 ${getTransformClass()}`}
        >
          <div className="flex flex-col gap-3 sm:gap-4 lg:grid lg:grid-cols-2 lg:gap-8 w-full h-full">
            {/* Text column */}
            <div className="flex flex-col justify-center shrink-0">
              <h3
                className="font-headline text-xl sm:text-2xl lg:text-4xl font-bold text-white
                mb-2 sm:mb-3 lg:mb-6 uppercase tracking-tight leading-tight"
              >
                {step.title}
              </h3>
              <p
                className="text-zinc-500 text-sm sm:text-base lg:text-xl leading-relaxed
                line-clamp-3 lg:line-clamp-none"
              >
                {step.description}
              </p>
            </div>

            {/* Image stack column */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={true}
                cards={images.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`card-${i + 1}`}
                    width={1680}
                    height={1739}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ))}
                autoplay
                autoplayDelay={2000}
                pauseOnHover={false}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`workflow-state absolute inset-0 flex items-center justify-center p-0
          transition-all duration-700 ${getTransformClass()}`}
      >
        <Video
          autoPlay
          muted
          preload="none"
          playsInline
          urlEndpoint="https://ik.imagekit.io/nyfnukger"
          src="/final_ai_video.mp4"
          width={1920}
          height={1080}
          className="w-full h-full bg-black object-contain lg:object-cover"
        />

        {/*
         * Overlay card — sits in the upper-centre third of the card so it
         * doesn't obscure the logo row that sits near the bottom of the video.
         *
         * On desktop the `items-center` places it dead-centre (fine, logos are
         * far enough down). On mobile we push it toward the top with
         * `items-start pt-6` so the video bottom stays clear.
         */}
        <div
          className="absolute inset-0 bg-black/40
          flex flex-col items-center justify-start pt-5 sm:pt-8 lg:justify-center lg:pt-0"
        >
          <div
            className="bg-white/10 backdrop-blur-xl border border-white/20
            p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl text-center
            w-[min(90%,340px)] sm:w-auto"
          >
            <h3
              className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-white
              mb-1 sm:mb-2 uppercase tracking-tighter"
            >
              {step.title}
            </h3>
            <p className="text-cyan-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
              {step.tagline}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

WorkflowStateCard.displayName = "WorkflowStateCard";
