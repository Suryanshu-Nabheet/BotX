"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface Props {
  tier: string;
  description: string;
  features: string[];
  price: string;
  buttonText: string;
  isPrimary: boolean;
}

const PricingCard = ({
  tier,
  description,
  features,
  price,
  buttonText,
  isPrimary,
}: Props) => {
  return (
    <motion.div
      className={cn(
        "flex w-full max-w-md cursor-pointer flex-col rounded-xl px-6 py-4",
        isPrimary ? "relative z-20" : "bg-muted-foreground/5"
      )}
      initial={{
        opacity: 0,
        filter: "blur(10px)",
      }}
      viewport={{ once: true }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.6,
          delay: isPrimary ? 0.2 : 0,
        },
      }}
    >
      {isPrimary && (
        <div className="-z-10 absolute inset-0 flex items-center justify-center">
          <div className="size-120 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,1)_40%,_#60a5fa_50%,_transparent_90%)] opacity-90 blur-[180px]" />
        </div>
      )}
      {/* card header */}
      <div className="mt-5 flex flex-col gap-4">
        <h2 className="font-semibold text-lg">{tier}</h2>
        <span className="inline-flex items-center gap-1 font-bold text-3xl sm:text-4xl">
          ${price} <span className="text-muted-foreground text-sm">/month</span>
        </span>
        <p className="text-muted-foreground">{description}</p>
        <Button
          asChild
          className={cn(
            "mt-5 w-full rounded-full py-6 text-base",
            isPrimary &&
              "relative bg-blue-700 text-white shadow-[0_0_25px_5px_rgba(59,130,246,0.4)] transition duration-300 hover:bg-blue-700/90"
          )}
          size="lg"
        >
          <Link href={isPrimary ? "/subscriptions" : "/ask"}>{buttonText}</Link>
        </Button>
      </div>
      <Separator className="my-10" />
      <ul className="flex flex-col gap-4 py-8">
        {features.map((feature) => (
          <li className="inline-flex items-center gap-4" key={feature}>
            <CheckCircle2
              className={cn(
                "size-5",
                isPrimary ? "text-blue-700" : "text-muted-foreground"
              )}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PricingCard;
