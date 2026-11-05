import { memo } from "react";

interface ProgressIndicatorProps {
  readonly activeStep: number;
  readonly totalSteps: number;
  readonly onDotClick?: (index: number) => void;
}

export const ProgressIndicator = memo<ProgressIndicatorProps>(
  ({ activeStep, totalSteps, onDotClick }) => {
    const getStepColor = (index: number): string => {
      if (index === activeStep) {
        return index === 1 ? "bg-purple-500" : "bg-cyan-400";
      }
      return "bg-white/10";
    };

    return (
      <div className="mt-8 sm:mt-12 lg:mt-16 flex gap-3 sm:gap-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to step ${index + 1}`}
            onClick={() => onDotClick?.(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${getStepColor(
              index,
            )}`}
          />
        ))}
      </div>
    );
  },
);

ProgressIndicator.displayName = "ProgressIndicator";
