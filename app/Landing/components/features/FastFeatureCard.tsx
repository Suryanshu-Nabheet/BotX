"use client";

import { cn } from "@/lib/utils";
import { SmileIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { aiMessage, userMessge } from "@/constants";
import FeatureCard from "./FeatureCard";
import Image from "next/image";
import { TypingAnimation } from "../magicui/typing-animation";

const FastFeatureCard = () => {
  return (
    <FeatureCard
      title="Blazingly-fast responses"
      description="Get instant answers to your questions."
    >
      <div className="flex flex-col gap-6 sm:gap-4 py-2 h-[260px] sm:h-[220px] pt-6 sm:pt-10">
        <Message role="user" message={userMessge} delay={0.4} />
        <Message role="ai" message={aiMessage} delay={0.8} />
      </div>
    </FeatureCard>
  );
};

interface MessageProps {
  role: "user" | "ai";
  message: string;
  delay: number;
}

const Message = ({ role, message, delay }: MessageProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isTypingBot, setIsTypingBot] = useState(true);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsTypingBot(false);
      }, 2000 + delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 5 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "flex gap-2",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      {/* avatar */}
      <div
        className={cn(
          "bg-muted-foreground/10 rounded-full p-2 h-fit transition duration-300",
          role === "user" ? "order-2" : "order-1 bg-transparent"
        )}
      >
        {role === "user" ? (
          <SmileIcon className="size-5 text-white" />
        ) : (
          <div className="flex items-center justify-center">
            <Image
              quality={100}
              unoptimized
              height={32}
              width={32}
              src="/botx-logo.png"
              alt="logo"
              className="h-8 w-8 object-contain"
            />
          </div>
        )}
      </div>

      {/* message */}
      <motion.div
        className={cn(
          "rounded-xl py-2 px-4 h-fit",
          role === "user"
            ? "order-1 bg-blue-700"
            : "order-2 bg-muted-foreground/5"
        )}
      >
        {role === "ai" && isTypingBot ? (
          <LoadingDots />
        ) : role === "user" ? (
          <p className="text-wrap max-w-sm">
            {message.split(" ").map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.8,
                  delay: isInView ? index * 0.1 : 0,
                }}
                className="text-sm"
              >
                {word}{" "}
              </motion.span>
            ))}
          </p>
        ) : (
          <TypingAnimation
            className="text-sm text-wrap max-w-sm font-medium"
            duration={10}
          >
            {message}
          </TypingAnimation>
        )}
      </motion.div>
    </motion.div>
  );
};

const LoadingDots = () => {
  return (
    <div className="flex space-x-1 mt-2">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="size-2 rounded-full bg-muted-foreground/60"
          initial={{ y: 0 }}
          whileInView={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: dot * 0.2,
          }}
          viewport={{ once: true }}
        />
      ))}
    </div>
  );
};

export default FastFeatureCard;
