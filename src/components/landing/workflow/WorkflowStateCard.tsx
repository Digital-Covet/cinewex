import { memo } from "react";
import type { WorkflowStep } from "@/types/landing";
import { Button } from "../common/Button";
import Stack from "@/components/ui/Stack";

interface WorkflowStateCardProps {
  readonly step: WorkflowStep;
  readonly isActive: boolean;
  readonly direction: "prev" | "current" | "next";
}
const images = [
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
];
export const WorkflowStateCard = memo<WorkflowStateCardProps>(
  ({ step, isActive, direction }) => {
    const getTransformClass = (): string => {
      if (isActive) return "translate-y-0 opacity-100";
      if (direction === "prev") return "-translate-y-full opacity-0";
      return "translate-y-full opacity-0";
    };

    if (step.id === 0) {
      return (
        <div
          className={`workflow-state absolute inset-0 flex items-center justify-center p-12 transition-all duration-700 ${getTransformClass()}`}
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              <span className="font-mono text-cyan-400 text-xs tracking-widest uppercase">
                {step.tagline}
              </span>
            </div>
            <h3 className="font-headline text-4xl font-bold text-white mb-6 uppercase tracking-tight">
              {step.title}
            </h3>
            <p className="text-zinc-500 text-xl leading-relaxed">
              {step.description}
            </p>
            {step.prompt && (
              <div className="mt-8 font-mono text-xs text-white/20">
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
          className={`workflow-state absolute inset-0 flex items-center justify-center p-12 transition-all duration-700 ${getTransformClass()}`}
        >
          <div className="grid grid-cols-2 gap-8 w-full h-full">
            <div className="flex flex-col justify-center">
              <h3 className="font-headline text-4xl font-bold text-white mb-6 uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-zinc-500 text-xl leading-relaxed">
                {step.description}
              </p>
            </div>
            <div className="grayscale overflow-hidden">
              <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={true}
                cards={images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`card-${i + 1}`}
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
        className={`workflow-state absolute inset-0 flex items-center justify-center p-0 transition-all duration-700 ${getTransformClass()}`}
      >
        <video
          muted
          loop
          autoPlay
          className="w-full h-full object-cover"
          src="https://v.ftcdn.net/16/63/73/74/700_F_1663737442_kwznre7yzLZp2d6KLgyS1oM8EQJYLDs9_ST.mp4"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl text-center">
            <h3 className="font-headline text-4xl font-bold text-white mb-2 uppercase tracking-tighter">
              {step.title}
            </h3>
            <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
              {step.tagline}
            </p>
            <Button variant="primary" size="sm" className="mt-8 rounded-full">
              Download Assets
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

WorkflowStateCard.displayName = "WorkflowStateCard";
