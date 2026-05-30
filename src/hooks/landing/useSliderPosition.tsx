import { type RefObject, useCallback, useRef, useState } from "react";
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

  const calculatePosition = useCallback(
    (clientX: number): number => {
      if (!sliderRef.current) return SLIDER_CONSTRAINTS.DEFAULT_POSITION;
      const rect = sliderRef.current.getBoundingClientRect();
      const rawPosition = ((clientX - rect.left) / rect.width) * 100;
      return clamp(
        rawPosition,
        SLIDER_CONSTRAINTS.MIN_POSITION,
        SLIDER_CONSTRAINTS.MAX_POSITION,
      );
    },
    [sliderRef],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // For mice, intent is instantly horizontal (click + drag).
      if (e.pointerType === "mouse") {
        e.preventDefault();
        (e.target as Element).setPointerCapture(e.pointerId);
        setIsDragging(true);
        intent.current = "horizontal";
        setPosition(calculatePosition(e.clientX));
      } else {
        // For touch/pen, record start position without preventing native scroll yet
        startPos.current = { x: e.clientX, y: e.clientY };
        intent.current = null;
      }
    },
    [calculatePosition],
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
            setPosition(calculatePosition(e.clientX));
          } else {
            intent.current = "vertical"; // Browser will handle vertical native scroll
          }
        }
      }

      if (intent.current === "horizontal" || isDragging) {
        // Use cancelable check to avoid passive event listener warnings
        if (e.cancelable) e.preventDefault();
        setPosition(calculatePosition(e.clientX));
      }
    },
    [isDragging, calculatePosition],
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
