import { cn } from "@/lib/utils";

const CORNERS = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];

/** Camera viewfinder corner marks. Purely decorative. */
export default function Viewfinder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
    >
      {CORNERS.map((corner) => (
        <span
          key={corner}
          className={cn("absolute size-5 border-fg/60 md:size-7", corner)}
        />
      ))}
    </div>
  );
}
