import Link from "next/link";
import { Button } from "../ui/button";

const CTA = () => {
  return (
    <section className="relative my-5 overflow-hidden py-12 md:my-10 md:py-20">
      <div className="grain-overlay absolute inset-0 top-20" />
      <div className="-z-10 absolute inset-0 top-90 flex items-center justify-center max-md:hidden">
        <div className="rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,1)_60%,_#3b82f6_40%,_#60a5fa_75%,_transparent_90%)] opacity-100 blur-[120px] md:size-80" />
      </div>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1 className="font-medium text-muted-foreground text-sm md:text-base">
            Start for free
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-semibold text-xl md:text-4xl">
            Experience lightning-fast AI
          </p>
        </div>
        <Button
          asChild
          className="group items-center gap-2 rounded-full bg-blue-700 py-6 text-white shadow-[0_0_25px_5px_rgba(59,130,246,0.4)] transition duration-300 hover:bg-blue-700/90 md:text-base"
          size="lg"
        >
          <Link href="/ask">Get Started Today</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTA;
