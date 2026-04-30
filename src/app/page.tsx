import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProblemSection } from "@/components/sections/ProblemsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CustomRequestSection } from "@/components/sections/CustomRequestSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ProblemSection />
        <HowItWorksSection />
        <ProductsSection />
        <PricingSection />
        <FAQSection />
        <CustomRequestSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}