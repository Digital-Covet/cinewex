import { useCallback, useEffect, useRef, useState } from "react";

interface UseShareOptions {
  timeoutMs?: number;
}

export function useShare({ timeoutMs = 2000 }: UseShareOptions = {}) {
  const [isShared, setIsShared] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleShare = useCallback(
    async (pressed: boolean) => {
      if (!pressed) return;

      const shareData = {
        title: document.title,
        url: window.location.href,
      };

      // Primary: Web Share API
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return;
          }
          console.warn(
            "Web Share API failed, falling back to clipboard.",
            error,
          );
        }
      }

      // Fallback: Clipboard API
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(window.location.href);

          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          setIsShared(true);
          timeoutRef.current = setTimeout(() => {
            setIsShared(false);
            timeoutRef.current = null;
          }, timeoutMs);
        } catch (error) {
          console.error("Failed to copy URL to clipboard.", error);
        }
      }
    },
    [timeoutMs],
  );

  return { isShared, handleShare } as const;
}
