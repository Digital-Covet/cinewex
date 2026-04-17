import Facebook from "@/assets/brands/facebook";
import Linkedin from "@/assets/brands/linkedin";
import Threads from "@/assets/brands/threads";
import Twitter from "@/assets/brands/x";
import Youtube from "@/assets/brands/youtube";

export const SOCIAL_LINKS = [
  {
    href: "https://www.threads.com/@cinewexofficial",
    label: "Follow us on Threads",
    icon: Threads,
    hoverBgClass: "hover:bg-black",
  },
  {
    href: "https://www.facebook.com/CinewexOfficial",
    label: "Follow us on Facebook",
    icon: Facebook,
    hoverBgClass: "hover:bg-blue-600",
  },
  {
    href: "https://www.youtube.com/@CinewexOfficial",
    label: "Follow us on YouTube",
    icon: Youtube,
    hoverBgClass: "hover:bg-red-600",
  },
  {
    href: "https://x.com/cinewexofficial",
    label: "Follow us on X",
    icon: Twitter,
    hoverBgClass: "hover:bg-black",
  },
  {
    href: "https://linkedin.com/company/cinewex",
    label: "Follow us on LinkedIn",
    icon: Linkedin,
    hoverBgClass: "hover:bg-blue-700",
  },
] as const;
