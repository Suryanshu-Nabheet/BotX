"use client";
import { motion } from "framer-motion";
import HeroVideoDialog from "../magicui/hero-video-dialog";
import { GetStartedButton, ShinyButton } from "./HeroButtons";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
    },
  },
};

const Hero = () => {
  return (
    <section className="relative py-16 md:py-20">
      {/* grain effect */}
      <div className="grain-overlay absolute inset-0 top-40" />
      <motion.div animate="animate" initial="initial" variants={itemVariants}>
        <ShinyButton />
      </motion.div>
      <motion.div
        animate="animate"
        className="mt-10 flex flex-col items-center justify-center gap-6 text-center [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
        initial="initial"
        variants={containerVariants}
      >
        <motion.h1
          className="font-semibold text-4xl md:text-6xl"
          variants={itemVariants}
        >
          The Fastest AI BotX
        </motion.h1>
        <motion.p
          className="mx-auto max-w-md text-base text-muted-foreground max-md:max-w-xs md:text-lg"
          variants={itemVariants}
        >
          Experience the fastest, most versatile AI chat app built to deliver
          instant, intelligent responses.
        </motion.p>
        <motion.div
          className="mt-2 flex items-center justify-center"
          variants={itemVariants}
        >
          <GetStartedButton />
        </motion.div>
        {/* hero video */}
        <motion.div
          className="relative mt-14 rounded-lg lg:mt-20"
          variants={itemVariants}
        >
          <HeroVideoDialog
            animationStyle="from-center"
            thumbnailAlt="Hero Video"
            thumbnailSrc="/hero-thumbnail.png"
            videoSrc="https://www.youtube.com/embed/QLvIoi2s1zY?si=IhZ2-lZ4k21M6Nbu"
          />
        </motion.div>
        {/* hero gradient */}
        <motion.div
          animate={{
            opacity: 1,
            transition: {
              duration: 0.8,
              delay: 0.8,
            },
          }}
          className="-translate-x-1/2 -z-10 absolute top-90 left-1/2 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,1)_40%,_#60a5fa_50%,_transparent_90%)] opacity-90 blur-[80px] max-md:hidden md:h-[400px] md:w-[400px] lg:h-[900px] lg:w-[900px]"
          initial={{
            opacity: 0,
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
