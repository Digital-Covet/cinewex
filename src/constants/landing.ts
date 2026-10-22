/** Every conversion point (nav, hero, final CTA) opens this form. */
export const TALLY_URL = "https://tally.so/r/2EgGgL";

/** Cinewex's ImageKit account; `video` paths below are relative to it. */
export const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/nyfnukger";

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Toolkit", href: "#tools" },
] as const;

export const SERVICES = [
  {
    title: "AI Product Ads",
    description:
      "Hero shots, macro detail and impossible physics for the products you sell, without booking a studio day.",
    image: "/portfolio/ai_product_ads.webp",
  },
  {
    title: "AI TV Commercial Production",
    description:
      "Broadcast-ready 15, 30 and 60-second spots with casting, voice-over, score and a full colour grade.",
    image: "/portfolio/ai_tv_commercial.webp",
  },
  {
    title: "AI Social Media Ads",
    description:
      "Scroll-stopping vertical cuts for Reels, Shorts and TikTok, versioned for every audience and hook.",
    image: "/storyboards/03.webp",
  },
  {
    title: "Brand Ad Campaigns",
    description:
      "One idea carried across film, stills and social, with the same world and cast in every frame.",
    image: "/portfolio/brand_ai_ad_campaign.webp",
  },
] as const;

export const WORKFLOW_STEPS = [
  {
    title: "The Neural Brief",
    description:
      "Tell us the product, the audience and the feeling you want to leave behind. We turn it into a script, a shot list and a storyboard you approve before a single frame is generated.",
    outputs: ["Script", "Shot list", "Storyboard"],
    image: "/storyboards/01.webp",
  },
  {
    title: "Visual Sculpting",
    description:
      "We generate, direct and refine every scene: performance, light, camera moves, voice and music. You review cuts as they come together, and we iterate until each frame earns its place.",
    outputs: ["Scene generation", "Voice & score", "Review rounds"],
    image: "/storyboards/05.webp",
  },
  {
    title: "Final Delivery",
    description:
      "You receive graded, mixed masters in every format you need: 16:9 for TV and YouTube, 9:16 for Reels and Shorts, 1:1 and 4:5 for the feed.",
    outputs: ["Colour grade", "Sound mix", "Every aspect ratio"],
    image: "/storyboards/09.webp",
    video: "/final_ai_video.mp4",
  },
] as const;

export const TOOLS = [
  { name: "After Effects", logo: "/tools/after-effect.svg" },
  { name: "Premiere Pro", logo: "/tools/premier-pro.svg" },
  { name: "ElevenLabs", logo: "/tools/elevenlabs.svg" },
  { name: "Flow", logo: "/tools/flow.svg" },
  { name: "Grok", logo: "/tools/grok.svg" },
  { name: "Qwen AI", logo: "/tools/qwen-ai.svg" },
  { name: "Roboneo", logo: "/tools/roboneo.svg" },
  { name: "Open Art", logo: "/tools/open-art.svg" },
  { name: "HiggsField", logo: "/tools/higgsfield.svg" },
  { name: "Pixabay", logo: "/tools/pixabay.svg" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy", href: "https://digitalcovet.com/privacy-policy/" },
  { label: "Terms", href: "https://digitalcovet.com/terms-conditions/" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/cinewex.media/",
  threads: "https://www.threads.com/@cinewex.media",
  facebook: "https://www.facebook.com/Cinewex.Media",
  youtube: "https://www.youtube.com/@Cinewex",
  x: "https://x.com/cinewex",
  linkedin: "https://www.linkedin.com/company/cinewexmedia",
} as const;
