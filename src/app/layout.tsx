import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
      <body className="min-h-screen block">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NB9BCKRV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({'gtm.start': new Date().getTime(),event:'gtm.js'});
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
        </Script>
        <Script
          id="gtm"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NB9BCKRV"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
