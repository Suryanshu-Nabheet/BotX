"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { Button } from "../ui/button";

export const ShinyButton = () => {
  return (
    <div className="z-10 flex items-center justify-center">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <div className="relative mr-2 inline-flex items-center">
            <span className="absolute size-2 rounded-full bg-blue-500" />
            <span className="size-2 animate-ping rounded-full bg-blue-500" />
          </div>
          <span className="text-sm">BotX app now available</span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
  );
};

export const GetStartedButton = () => {
  return (
    <Button
      asChild
      className="group gap-0.5 rounded-full bg-blue-700 text-white shadow-[0_0_25px_5px_rgba(59,130,246,0.4)] transition duration-300 hover:bg-blue-700/90"
      size="lg"
    >
      <Link href="/ask">
        Get Started
        <ChevronRight className="-mt-[0.02px] size-4 transition group-hover:translate-x-0.5" />
      </Link>
    </Button>
  );
};
