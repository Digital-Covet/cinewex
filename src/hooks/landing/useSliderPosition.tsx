import { type RefObject, useCallback, useState } from "react";
import { SLIDER_CONSTRAINTS } from "@/constants/landing/animations";
import { clamp } from "@/utils/landing/math";

interface UseSliderPositionReturn {
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  isDragging: boolean;
  handlePointerDown: (e: React.PointerEvent) => void;
  handlePointerMove: (e: React.PointerEvent) => void;
  handlePointerUp: () => void;
}

export const useSliderPosition = (
  sliderRef: RefObject<HTMLDivElement | null>,
): UseSliderPositionReturn => {
  const [position, setPosition] = useState<number>(
    SLIDER_CONSTRAINTS.DEFAULT_POSITION,
  );
  const [isDragging, setIsDragging] = useState(false);

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
      e.preventDefault();
      setIsDragging(true);
      (e.target as Element).setPointerCapture(e.pointerId);
      setPosition(calculatePosition(e.clientX));
    },
    [calculatePosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      setPosition(calculatePosition(e.clientX));
    },
    [isDragging, calculatePosition],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    position,
    setPosition,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
