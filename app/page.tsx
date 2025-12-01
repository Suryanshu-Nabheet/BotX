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
      <div className="relative flex w-full flex-1 flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
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
