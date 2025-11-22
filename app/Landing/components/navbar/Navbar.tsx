"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constants";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <motion.header className="sticky top-0 z-40 bg-transparent py-6 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-8 lg:px-4">
        {/* logo */}
        <Link className="flex items-center gap-1.5" href="#">
          <Image
            alt="logo"
            height={32}
            quality={100}
            src="/botx-logo.png"
            unoptimized
            width={32}
          />
          <span className="font-bold text-xl">BotX</span>
        </Link>

        {/* links */}
        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-4 md:flex">
            {navLinks.map((link) => (
              <Link
                className="font-medium text-muted-foreground text-sm transition-all hover:text-white"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}

            <Button asChild className="rounded-md text-sm" variant="ghost">
              <Link href="/ask">Try for free</Link>
            </Button>
          </ul>
          <MobileNav />
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
