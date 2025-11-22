import VideoCarousel from "./VideoCarousel";

const GetStarted = () => {
  return (
    <section className="py-12 md:py-20" id="get-started">
      <div className="text-center">
        <h1 className="section-heading">Get Started</h1>
        <p className="text-muted-foreground max-w-md max-md:max-w-xs mx-auto text-base md:text-lg mt-2">
          Just three steps to get started
        </p>
      </div>

      {/* video carousel */}
      <VideoCarousel />
    </section>
  );
};

export default GetStarted;
