import Facebook from "@/assets/brands/facebook";
import Instagram from "@/assets/brands/instagram";
import Linkedin from "@/assets/brands/linkedin";
import Threads from "@/assets/brands/threads";
import Twitter from "@/assets/brands/x";
import Youtube from "@/assets/brands/youtube";

export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/cinewex.media/",
    label: "Follow us on Instagram",
    icon: Instagram,
    hoverBgClass: "hover:bg-pink-600",
  },
  {
    href: "https://www.threads.com/@cinewex.media",
    label: "Follow us on Threads",
    icon: Threads,
    hoverBgClass: "hover:bg-black",
  },
  {
    href: "https://www.facebook.com/Cinewex",
    label: "Follow us on Facebook",
    icon: Facebook,
    hoverBgClass: "hover:bg-blue-600",
  },
  {
    href: "https://www.youtube.com/@Cinewex",
    label: "Follow us on YouTube",
    icon: Youtube,
    hoverBgClass: "hover:bg-red-600",
  },
  {
    href: "https://x.com/cinewex",
    label: "Follow us on X",
    icon: Twitter,
    hoverBgClass: "hover:bg-black",
  },
  {
    href: "https://www.linkedin.com/company/cinewexofficial",
    label: "Follow us on LinkedIn",
    icon: Linkedin,
    hoverBgClass: "hover:bg-blue-700",
  },
] as const;
