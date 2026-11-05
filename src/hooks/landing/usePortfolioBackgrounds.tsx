import { useCallback, useState } from "react";
import type { BackgroundId, PortfolioBackgroundState } from "@/types/landing";

interface UsePortfolioBackgroundsReturn {
  backgrounds: PortfolioBackgroundState;
  show: (bgId: BackgroundId) => void;
  hide: (bgId: BackgroundId) => void;
}

const INITIAL_STATE: PortfolioBackgroundState = {
  "bg-neon": false,
  "bg-aura": false,
  "bg-lumina": false,
  "bg-orion": false,
} as const;

export const usePortfolioBackgrounds = (): UsePortfolioBackgroundsReturn => {
  const [backgrounds, setBackgrounds] =
    useState<PortfolioBackgroundState>(INITIAL_STATE);

  const show = useCallback((bgId: BackgroundId): void => {
    setBackgrounds((prev) => ({ ...prev, [bgId]: true }));
  }, []);

  const hide = useCallback((bgId: BackgroundId): void => {
    setBackgrounds((prev) => ({ ...prev, [bgId]: false }));
  }, []);

  return { backgrounds, show, hide };
};
