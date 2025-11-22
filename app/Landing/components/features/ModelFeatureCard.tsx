"use client";

import type React from "react";

import { RiGeminiFill, RiClaudeFill, RiOpenaiFill } from "react-icons/ri";
import Image from "next/image";

import { motion, useInView } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { useRef } from "react";

const centerIconVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const innerRingVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
    },
  },
};

const outerRingVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.6,
    },
  },
};

const ModelFeatureCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <FeatureCard
      className="lg:col-span-3"
      title="Multi-model"
      description="Choose from a variety of popular ai models."
    >
      {/* orbiting circles */}
      <div
        className="relative h-[320px] sm:h-[260px] w-full items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
        ref={ref}
      >
        <motion.div
          className="absolute p-2.5 flex items-center justify-center max-sm:top-[50%] top-50 md:top-52 lg:top-50 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          variants={centerIconVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Image
            quality={100}
            unoptimized
            height={40}
            width={40}
            src="/botx-logo.png"
            alt="logo"
            className="rounded-md"
          />
        </motion.div>

        {/* ring-1 */}
        <motion.div
          className="absolute max-sm:top-[50%] max-sm:size-40 size-60 md:size-56 lg:size-60 rounded-full top-60 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 will-change-transform [backface-visibility:hidden]"
          style={{
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05))",
            boxShadow: "inset 0 0 15px rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.7)",
          }}
          variants={innerRingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileInView={{
            rotate: "1turn",
            transition: {
              ease: "linear",
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.3,
            },
          }}
        >
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
            <Icon
              icon={
                <RiOpenaiFill className="size-8 max-sm:size-6" fill="#d8d8d8" />
              }
            />
          </div>
          <div className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2">
            <Icon
              icon={
                <RiGeminiFill
                  className="size-7.5 max-sm:size-6"
                  fill="#3195ff"
                />
              }
            />
          </div>
        </motion.div>

        {/* ring-2 */}
        <motion.div
          className="absolute max-sm:top-[50%] max-sm:size-70 size-100 md:size-90 lg:size-100 rounded-full top-60 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 will-change-transform [backface-visibility:hidden]"
          style={{
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.02))",
            boxShadow: "inset 0 0 20px rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.6)",
          }}
          variants={outerRingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileInView={{
            rotate: "-1turn",
            transition: {
              ease: "linear",
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.6,
            },
          }}
        >
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
            <Icon
              icon={
                <Image
                  src="/deepseek-logo.svg"
                  height={32}
                  width={32}
                  alt="deepseek"
                  className="max-sm:size-6"
                />
              }
            />
          </div>
          <div className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2">
            <Icon
              icon={
                <RiClaudeFill className="size-8 max-sm:size-6" fill="#ff9f5b" />
              }
            />
          </div>
        </motion.div>
      </div>
    </FeatureCard>
  );
};

const Icon = ({ icon }: { icon: React.ReactElement }) => {
  return (
    <div className="p-2 bg-neutral-800 rounded-full shadow-md">{icon}</div>
  );
};

export default ModelFeatureCard;