import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Hero } from "@/components/home/hero";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { IdeaToKit } from "@/components/home/idea-to-kit";
import { TemplateShowcase } from "@/components/home/template-showcase";
import { MaterialGrid } from "@/components/home/material-grid";
import { UseCases } from "@/components/home/use-cases";
import { Pricing } from "@/components/home/pricing";
import { FAQ } from "@/components/home/faq";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MarqueeStrip />
        <IdeaToKit />
        <TemplateShowcase />
        <MaterialGrid />
        <UseCases />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
