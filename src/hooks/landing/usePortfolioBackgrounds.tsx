import { useCallback, useState } from "react";
import type { BackgroundId } from "@/types/landing";

interface UsePortfolioBackgroundsReturn {
  active: BackgroundId | null;
  previous: BackgroundId | null;
  show: (bgId: BackgroundId) => void;
  clear: () => void;
}

interface BackgroundState {
  active: BackgroundId | null;
  previous: BackgroundId | null;
}

const INITIAL_STATE: BackgroundState = {
  active: null,
  previous: null,
};

export const usePortfolioBackgrounds = (): UsePortfolioBackgroundsReturn => {
  const [state, setState] = useState<BackgroundState>(INITIAL_STATE);

  const show = useCallback((bgId: BackgroundId): void => {
    setState((prev) => {
      if (prev.active === bgId) return prev;
      return { active: bgId, previous: prev.active };
    });
  }, []);

  const clear = useCallback((): void => {
    setState((prev) => {
      if (prev.active === null) return prev;
      return { active: null, previous: prev.active };
    });
  }, []);

  return { active: state.active, previous: state.previous, show, clear };
};
