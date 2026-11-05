import { memo } from "react";

interface AmbientOrbProps {
  readonly position:
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";
  readonly color: "cyan" | "purple";
  readonly size?: "sm" | "md" | "lg";
  readonly blur?: "sm" | "md" | "lg";
  readonly className?: string;
}

const positionClasses: Record<AmbientOrbProps["position"], string> = {
  "top-left": "top-1/4 -left-20",
  "top-right": "top-1/4 -right-20",
  "bottom-left": "bottom-1/4 -left-20",
  "bottom-right": "bottom-1/4 -right-20",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const colorClasses: Record<AmbientOrbProps["color"], string> = {
  cyan: "bg-cyan-500/10",
  purple: "bg-purple-500/10",
};

const sizeClasses = {
  sm: "w-[600px] h-[600px]",
  md: "w-[800px] h-[800px]",
  lg: "w-[1000px] h-[1000px]",
};

const blurClasses = {
  sm: "blur-[120px]",
  md: "blur-[150px]",
  lg: "blur-[200px]",
};

export const AmbientOrb = memo<AmbientOrbProps>(
  ({ position, color, size = "md", blur = "md", className = "" }) => {
    return (
      <div
        className={`absolute ${positionClasses[position]} ${sizeClasses[size]} ${colorClasses[color]} ${blurClasses[blur]} rounded-full pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  },
);

AmbientOrb.displayName = "AmbientOrb";
