import type { PortfolioItem } from "@/types/landing";

export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: "neon-genesis",
    title: "NEON GENESIS",
    category: "AUTOMOTIVE",
    backgroundId: "bg-neon",
    hoverColor: "cyan",
    imagePath: "/assets/neon-genesis.jpg",
    backgroundColor: "#001f24",
  },
  {
    id: "aura-fashion",
    title: "AURA",
    category: "FASHION",
    backgroundId: "bg-aura",
    hoverColor: "purple",
    imagePath: "/assets/aura-fashion.jpg",
    backgroundColor: "#2c0051",
  },
  {
    id: "lumina-luxury",
    title: "LUMINA",
    category: "LUXURY",
    backgroundId: "bg-lumina",
    hoverColor: "cyan",
    imagePath: "/assets/lumina-luxury.jpg",
    backgroundColor: "#00363d",
  },
  {
    id: "orion-performance",
    title: "ORION",
    category: "PERFORMANCE",
    backgroundId: "bg-orion",
    hoverColor: "purple",
    imagePath: "/assets/orion-performance.jpg",
    backgroundColor: "#1c1b1d",
  },
] as const;
