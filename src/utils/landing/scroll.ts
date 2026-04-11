export const calculateScrollPercentage = (
  element: HTMLElement | null,
  scrollContainer: HTMLElement | Window = window,
): number => {
  if (!element) return 0;

  const isWindow = scrollContainer === window;

  const scrollY = isWindow
    ? window.scrollY
    : (scrollContainer as HTMLElement).scrollTop;

  const containerHeight = isWindow
    ? window.innerHeight
    : (scrollContainer as HTMLElement).clientHeight;

  const elementRect = element.getBoundingClientRect();

  const containerTop = isWindow
    ? 0
    : (scrollContainer as HTMLElement).getBoundingClientRect().top;

  // Position of the element's top edge in the container's scroll coordinate space
  const elementOffsetInContainer = elementRect.top - containerTop + scrollY;

  const scrollable = element.offsetHeight - containerHeight;
  if (scrollable <= 0) return 0;

  const scrollPercent = (scrollY - elementOffsetInContainer) / scrollable;

  return Math.max(0, Math.min(1, scrollPercent));
};

export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};
