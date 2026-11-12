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
  readonly className?: string;
}

const positionClasses: Record<AmbientOrbProps["position"], string> = {
  "top-left": "top-1/4 -left-20",
  "top-right": "top-1/4 -right-20",
  "bottom-left": "bottom-1/4 -left-20",
  "bottom-right": "bottom-1/4 -right-20",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const colorStyles: Record<AmbientOrbProps["color"], string> = {
  cyan: "radial-gradient(circle, rgba(6, 182, 212, 0.20) 0%, rgba(6, 182, 212, 0.08) 38%, transparent 70%)",
  purple:
    "radial-gradient(circle, rgba(168, 85, 247, 0.20) 0%, rgba(168, 85, 247, 0.08) 38%, transparent 70%)",
};

const sizeClasses = {
  sm: "w-[600px] h-[600px]",
  md: "w-[800px] h-[800px]",
  lg: "w-[1000px] h-[1000px]",
};

export const AmbientOrb = memo<AmbientOrbProps>(
  ({ position, color, size = "md", className = "" }) => {
    return (
      <div
        className={`absolute ${positionClasses[position]} ${sizeClasses[size]} rounded-full pointer-events-none ${className}`}
        style={{ background: colorStyles[color] }}
        aria-hidden="true"
      />
    );
  },
);

AmbientOrb.displayName = "AmbientOrb";
