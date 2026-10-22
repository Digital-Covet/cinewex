import { ImageKitProvider } from "@imagekit/next";
import { IMAGEKIT_URL_ENDPOINT } from "@/constants/landing";
import Navigation from "./Navigation";
import SmoothScroll from "./SmoothScroll";
import FinalCta from "./sections/FinalCta";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Premise from "./sections/Premise";
import RealitySlider from "./sections/RealitySlider";
import Services from "./sections/Services";
import Tools from "./sections/Tools";
import Workflow from "./sections/Workflow";

/**
 * Scroll order matters: each section creates its ScrollTriggers on mount,
 * top to bottom, so pins measure correctly.
 */
export default function CinewexLanding() {
  return (
    <ImageKitProvider urlEndpoint={IMAGEKIT_URL_ENDPOINT}>
      <SmoothScroll>
        <Navigation />
        <main>
          <Hero />
          <Premise />
          <RealitySlider />
          <Services />
          <Workflow />
          <Tools />
          <FinalCta />
        </main>
        <Footer />
      </SmoothScroll>
    </ImageKitProvider>
  );
}
