import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SLIDER_CONSTRAINTS } from "@/constants/landing/animations";
import { clamp } from "@/utils/landing/math";

interface UseSliderPositionReturn {
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  isDragging: boolean;
  handlePointerDown: (e: React.PointerEvent) => void;
  handlePointerMove: (e: React.PointerEvent) => void;
  handlePointerUp: (e: React.PointerEvent) => void;
}

export const useSliderPosition = (
  sliderRef: RefObject<HTMLDivElement | null>,
): UseSliderPositionReturn => {
  const [position, setPosition] = useState<number>(
    SLIDER_CONSTRAINTS.DEFAULT_POSITION,
  );
  const [isDragging, setIsDragging] = useState(false);

  // Refs for tracking swipe intent
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const intent = useRef<"horizontal" | "vertical" | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pendingPosition = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  const calculatePosition = useCallback(
    (clientX: number): number => {
      const rect =
        rectRef.current ?? sliderRef.current?.getBoundingClientRect() ?? null;
      if (!rect) return SLIDER_CONSTRAINTS.DEFAULT_POSITION;

      const rawPosition = ((clientX - rect.left) / rect.width) * 100;
      return clamp(
        rawPosition,
        SLIDER_CONSTRAINTS.MIN_POSITION,
        SLIDER_CONSTRAINTS.MAX_POSITION,
      );
    },
    [sliderRef],
  );

  const schedulePosition = useCallback(
    (clientX: number) => {
      pendingPosition.current = calculatePosition(clientX);
      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        if (pendingPosition.current !== null) {
          setPosition(pendingPosition.current);
          pendingPosition.current = null;
        }
      });
    },
    [calculatePosition],
  );

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      rectRef.current = sliderRef.current?.getBoundingClientRect() ?? null;

      // For mice, intent is instantly horizontal (click + drag).
      if (e.pointerType === "mouse") {
        e.preventDefault();
        (e.target as Element).setPointerCapture(e.pointerId);
        setIsDragging(true);
        intent.current = "horizontal";
        schedulePosition(e.clientX);
      } else {
        // For touch/pen, record start position without preventing native scroll yet
        startPos.current = { x: e.clientX, y: e.clientY };
        intent.current = null;
      }
    },
    [schedulePosition, sliderRef],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (
        e.pointerType !== "mouse" &&
        intent.current === null &&
        startPos.current
      ) {
        const deltaX = Math.abs(e.clientX - startPos.current.x);
        const deltaY = Math.abs(e.clientY - startPos.current.y);

        // Wait for a 10px movement threshold to confirm swipe direction
        if (deltaX > 10 || deltaY > 10) {
          if (deltaX > deltaY) {
            intent.current = "horizontal";
            setIsDragging(true);
            (e.target as Element).setPointerCapture(e.pointerId);
            schedulePosition(e.clientX);
          } else {
            intent.current = "vertical"; // Browser will handle vertical native scroll
          }
        }
      }

      if (intent.current === "horizontal" || isDragging) {
        // Use cancelable check to avoid passive event listener warnings
        if (e.cancelable) e.preventDefault();
        schedulePosition(e.clientX);
      }
    },
    [isDragging, schedulePosition],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      // If user tapped without dragging beyond the threshold, update slider on tap release
      if (
        e.pointerType !== "mouse" &&
        intent.current === null &&
        startPos.current
      ) {
        setPosition(calculatePosition(e.clientX));
      }

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      // Apply the most recent pending value so the final drag position sticks.
      if (pendingPosition.current !== null) {
        setPosition(pendingPosition.current);
        pendingPosition.current = null;
      }
      rectRef.current = null;

      setIsDragging(false);
      intent.current = null;
      startPos.current = null;

      // Native behavior automatically releases pointer capture on pointerup/pointercancel,
      // so manual e.target.releasePointerCapture is not strictly necessary.
    },
    [calculatePosition],
  );

  return {
    position,
    setPosition,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
