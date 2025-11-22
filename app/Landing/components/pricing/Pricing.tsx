import { plans } from "@/constants";

import PricingCard from "./PricingCard";

const Pricing = () => {
  return (
    <section className="relative py-12 md:py-20" id="pricing">
      <div className="text-center">
        <h1 className="section-heading">Pricing</h1>
        <p className="text-muted-foreground max-w-md max-md:max-w-xs mx-auto text-base md:text-lg mt-2">
          Choose the plan that works best for you.
        </p>
      </div>

      {/* pricing cards */}
      <div className="mt-20 lg:px-16 flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12 md:justify-center max-md:items-center">
        {plans.map((plan) => (
          <PricingCard key={plan.tier} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
