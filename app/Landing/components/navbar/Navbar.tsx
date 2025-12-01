"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constants";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.header className="sticky top-0 z-40 bg-background/80 py-4 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80">
      <nav className="mx-auto flex w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* logo */}
        <Link className="flex items-center gap-1.5" href="#">
          <Image
            alt="logo"
            className="size-8"
            height={32}
            src="/botx-logo.png"
            width={32}
          />
          <span className="font-semibold text-lg">BotX</span>
        </Link>

        {/* nav links */}
        <ul className="flex items-center gap-6 max-md:hidden">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                className="font-medium text-muted-foreground text-sm transition duration-300 hover:text-foreground"
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* cta */}
        <Link
          className="rounded-full bg-blue-700 px-4 py-2 font-medium text-sm text-white shadow-md transition duration-300 hover:bg-blue-700/90"
          href="/ask"
        >
          Get Started
        </Link>
      </nav>
    </motion.header>
  );
};

export default Navbar;
