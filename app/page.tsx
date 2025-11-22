import CTA from "@/app/Landing/components/CTA/CTA";
import FAQs from "@/app/Landing/components/faqs/FAQs";
import Features from "@/app/Landing/components/features/Features";
import Footer from "@/app/Landing/components/footer/Footer";
import GetStarted from "@/app/Landing/components/get-started/GetStarted";
import Hero from "@/app/Landing/components/hero/Hero";
import Navbar from "@/app/Landing/components/navbar/Navbar";
import Pricing from "@/app/Landing/components/pricing/Pricing";
import Testimonials from "@/app/Landing/components/testimonials/Testimonials";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 md:px-8 lg:px-12">
        <Hero />
        <Features />
        <GetStarted />
        <Testimonials />
        <Pricing />
        <FAQs />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
