import CustomiseFeatureCard from "./CustomiseFeatureCard";
import ModelFeatureCard from "./ModelFeatureCard";
import SyncFeatureCard from "./SyncFeatureCard";
import FastFeatureCard from "./FastFeatureCard";

const Features = () => {
  return (
    <section className="py-12 md:py-20" id="features">
      <div className="text-center">
        <h1 className="section-heading">Features</h1>
        <p className="text-muted-foreground max-w-md max-md:max-w-xs mx-auto text-base md:text-lg mt-2">
          Your Advanced AI Assistant
        </p>
      </div>

      {/* features grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 mt-20 sm:px-10 md:px-1 lg:px-14 gap-5 md:gap-4">
        <FastFeatureCard />
        <ModelFeatureCard />
        <SyncFeatureCard />
        <CustomiseFeatureCard />
      </div>
    </section>
  );
};

export default Features;
