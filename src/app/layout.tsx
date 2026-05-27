import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const spaceSans = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinewex - AI Ad Films & Brand Campaigns for Modern Brands",
  description:
    "Cinewex builds AI-generated TV commercials, product ads, and social media campaigns for brands - cinematic storytelling at a fraction of the time and cost.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", spaceSans.variable, interSans.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-screen block">{children}</body>
    </html>
  );
}
