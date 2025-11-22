"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { steps } from "@/constants";
import { cn } from "@/lib/utils";

const VideoCarousel = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showReplay, setShowReplay] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20% 0px" });

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, steps.length);
  }, []);

  useEffect(() => {
    if (activeStep === null) return;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeStep) {
        video.currentTime = 0;
        video.play().catch((err) => console.error("Video play error:", err));
      } else {
        video.pause();
      }
    });
  }, [activeStep]);

  useEffect(() => {
    if (isInView && activeStep === null) {
      setActiveStep(0);
    }
  }, [isInView, activeStep]);

  const handleReplay = () => {
    setShowReplay(false);
    setActiveStep(0);
  };

  const playNextVideo = () => {
    if (activeStep === null) return;
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => (prev ?? 0) + 1);
    } else {
      setShowReplay(true);
    }
  };

  return (
    <div ref={containerRef} className="mt-20 px-4 sm:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-10 items-start w-full">
        {/* Video Container */}
        <div className="relative rounded-xl w-full h-full order-1 lg:order-2">
          <AnimatePresence mode="wait">
            {steps.map(
              (step, index) =>
                activeStep === index && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 5 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(10px)", y: 5 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-video rounded-lg"
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={step.video}
                      className="w-full h-full object-cover rounded-lg"
                      muted
                      playsInline
                      autoPlay
                      onEnded={playNextVideo}
                    />
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Replay overlay */}
          {showReplay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center z-10"
            >
              <button
                onClick={handleReplay}
                className="bg-muted-foreground/10 hover:bg-muted-foreground/15 transition duration-300 rounded-full p-2"
              >
                <RotateCcw className="size-5 text-blue-700" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Steps Section */}
        <div className="flex flex-col gap-4 order-2 lg:order-1 w-full">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl transition-all duration-300 flex-1 cursor-pointer",
                activeStep === index ? "bg-muted-foreground/5" : ""
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
                  activeStep === index
                    ? "bg-muted-foreground/10"
                    : "bg-secondary"
                )}
              >
                {activeStep !== null && activeStep > index ? (
                  <Check className="size-4 text-blue-700" />
                ) : (
                  <span className="text-sm text-blue-700 font-medium">
                    {index + 1}
                  </span>
                )}
              </div>
              <div>
                <h3
                  className={cn(
                    "text-lg font-medium mb-2",
                    activeStep === index ? "text-primary" : "text-white"
                  )}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs md:max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
