import CustomiseFeatureCard from "./CustomiseFeatureCard";
import ModelFeatureCard from "./ModelFeatureCard";
import SyncFeatureCard from "./SyncFeatureCard";
import FastFeatureCard from "./FastFeatureCard";

const Features = () => {
  return (
    <section
      className="relative py-12 md:py-20 border-b border-neutral-200/80 dark:border-neutral-800/80"
      id="features"
    >
      <div className="absolute inset-x-0 bottom-0 h-px w-full">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent left-0 right-0" />
      </div>
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
