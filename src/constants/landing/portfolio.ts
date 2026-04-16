import type { PortfolioItem } from "@/types/landing";

export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: "ai-product-ads",
    title: "AI Product Ads",
    backgroundId: "bg-neon",
    hoverColor: "cyan",
    imagePath: "/portfolio/ai_product_ads.webp",
    backgroundColor: "#001f24",
  },
  {
    id: "ai-tv-commercial",
    title: "AI TV commercial production",
    backgroundId: "bg-aura",
    hoverColor: "purple",
    imagePath: "/portfolio/ai_tv_commercial.webp",
    backgroundColor: "#2c0051",
  },
  {
    id: "ai-social-media-ads",
    title: "ai social media ads",
    backgroundId: "bg-lumina",
    hoverColor: "cyan",
    imagePath:
      "https://zeely.ai/blog/wp-content/uploads/2025/12/social-media-campaign-examples-optimized.jpg",
    backgroundColor: "#00363d",
  },
  {
    id: "brand-ad-campaigns",
    title: "Brand Ad Campaigns",
    backgroundId: "bg-orion",
    hoverColor: "purple",
    imagePath: "/portfolio/brand_ai_ad_campaign.webp",
    backgroundColor: "#1c1b1d",
  },
] as const;
