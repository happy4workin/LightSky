"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";
import { NavDock } from "@/components/ui/NavDock";

export default function Home() {
  return (
    <main className="min-h-screen bg-void text-foreground selection:bg-nebula-blue/30">
      <NavDock />
      <HeroSection />
      {/* Dark Mist Transition Overlay - Extended */}
      <div className="w-full h-[80vh] bg-gradient-to-b from-[#030303] via-black/80 to-transparent pointer-events-none -mt-[40vh] z-20 relative opacity-90 blur-2xl" />
      <ManifestoSection />
      <ShowcaseSection />
      <CTASection />
      <Footer />
    </main>
  );
}
