import { type RefObject, useEffect, useState } from "react";

interface UseInViewOptions {
  readonly rootMargin?: string;
  readonly threshold?: number | number[];
}

/**
 * Tracks whether an element is near the viewport.
 * Used to pause expensive animations and timers when their section is offscreen.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { rootMargin = "200px 0px", threshold = 0 }: UseInViewOptions = {},
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return isInView;
}
