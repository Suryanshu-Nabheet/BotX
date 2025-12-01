"use client";

import { cn } from "@/lib/utils";
import { SmileIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { aiMessage, userMessge } from "@/constants";
import FeatureCard from "./FeatureCard";
import Image from "next/image";

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
  const [showTyping, setShowTyping] = useState(true);

  useEffect(() => {
    if (isInView && role === "ai") {
      // Show typing indicator for 1.5 seconds before starting actual typing
      const timer = setTimeout(() => {
        setShowTyping(false);
      }, 1500 + delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, role]);

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
        {role === "ai" && showTyping ? (
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
          <OptimizedTypingAnimation
            text={message}
            isInView={isInView}
            className="text-sm text-wrap max-w-sm font-medium"
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// Optimized typing animation component with smooth character-by-character typing
interface TypingAnimationProps {
  text: string;
  isInView: boolean;
  className?: string;
}

const OptimizedTypingAnimation = ({
  text,
  isInView,
  className,
}: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (currentIndex < text.length) {
      // Fast typing speed: 15ms per character for smooth, quick typing
      const timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 15);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isInView]);

  return (
    <p className={cn("min-h-[20px]", className)}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[2px] h-4 bg-current ml-0.5 align-middle"
        />
      )}
    </p>
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
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            delay: dot * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default FastFeatureCard;
