import CTA from "@/app/Landing/components/CTA/CTA";
import FAQs from "@/app/Landing/components/faqs/FAQs";
import Features from "@/app/Landing/components/features/Features";
import Footer from "@/app/Landing/components/footer/Footer";
import Integrations from "@/app/Landing/components/integration/Integrations";
import Hero from "@/app/Landing/components/hero/Hero";
import Navbar from "@/app/Landing/components/navbar/Navbar";
import Pricing from "@/app/Landing/components/pricing/Pricing";
import Testimonials from "@/app/Landing/components/testimonials/Testimonials";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col border-x border-neutral-200/80 bg-background dark:border-neutral-800/80">
        {/* Top Gradient Accent for Borders */}
        <div className="absolute top-0 left-[-1px] h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        <div className="absolute top-0 right-[-1px] h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

        <Navbar />
        <main className="flex-1">
          <Hero />
          <div className="px-6 md:px-8 lg:px-12">
            <Features />
            <Integrations />
            <Testimonials />
            <Pricing />
            <FAQs />
            <CTA />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
