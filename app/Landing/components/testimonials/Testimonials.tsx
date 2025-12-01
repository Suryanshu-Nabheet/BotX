"use client";

import { testimonials } from "@/constants";
import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <section className="relative py-12 md:py-20 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="absolute inset-x-0 bottom-0 h-px w-full">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent left-0 right-0" />
      </div>
      <div className="text-center">
        <h1 className="section-heading">Testimonials</h1>
        <p className="text-muted-foreground max-w-md max-md:max-w-xs mx-auto text-base md:text-lg mt-2">
          What our Customers are saying
        </p>
      </div>

      <motion.div className="flex flex-col gap-4 mt-20 [mask-image:linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,rgba(0,0,0,0)_100%)] overflow-hidden">
        {/* first row */}
        <motion.div
          className="flex gap-5 pl-5 flex-none min-w-max"
          initial={{
            translateX: "-50%",
          }}
          animate={{
            translateX: "0%",
            transition: {
              ease: "linear",
              duration: "40",
              repeat: Infinity,
            },
          }}
        >
          {[...testimonials.slice(0, 6), ...testimonials.slice(0, 6)].map(
            (testimonial, index) => (
              <TestimonialCard {...testimonial} key={index} />
            )
          )}
        </motion.div>

        {/* second row*/}
        <motion.div
          className="flex gap-5 pr-5 flex-none min-w-max"
          initial={{
            translateX: "0%",
          }}
          animate={{
            translateX: "-50%",
            transition: {
              ease: "linear",
              duration: "40",
              repeat: Infinity,
            },
          }}
        >
          {[...testimonials.slice(6), ...testimonials.slice(6)].map(
            (testimonial, index) => (
              <TestimonialCard {...testimonial} key={index} />
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
