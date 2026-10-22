import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
      className={cn(
        "antialiased",
        bricolage.variable,
        inter.variable,
        jetbrains.variable,
      )}
    >
      <body className="min-h-screen block isolate">{children}</body>
    </html>
  );
}
