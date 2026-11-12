import type { NextConfig } from "next";

const publicAssetCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=604800, stale-while-revalidate=86400",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [50, 60, 75, 90],
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  experimental: {
    inlineCss: true,
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  async headers() {
    return [
      "/headline/:path*",
      "/portfolio/:path*",
      "/reality-slider/:path*",
      "/storyboards/:path*",
      "/tools/:path*",
    ].map((source) => ({ source, headers: publicAssetCache }));
  },
};

export default nextConfig;
