import type { ClientBrand, TestimonialData } from "@/types/landing";

export const CLIENT_BRANDS: readonly ClientBrand[] = [
  { id: "cinemax", name: "CINEMAX" },
  { id: "sony", name: "SONY" },
  { id: "netflix", name: "NETFLIX" },
  { id: "paramount", name: "PARAMOUNT" },
  { id: "warner", name: "WARNER BROS" },
  { id: "a24", name: "A24" },
] as const;

export const TESTIMONIAL: TestimonialData = {
  quote:
    "Cinewex didn't just speed up our post-production; they fundamentally changed how we conceptualize the image. It's the first agency that feels as creative as a director's eye.",
  author: "MARCUS VAUGHN",
  role: "EVP OF PRODUCTION",
  company: "NEON LIGHT STUDIOS",
  avatarPath: "/testimonial.png",
} as const;
