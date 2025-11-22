"use client";

import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 md:pt-20 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link className="flex items-center gap-1" href="#">
              <Image
                alt="logo"
                height={32}
                quality={100}
                src="/botx-logo.png"
                unoptimized
                width={32}
              />
              <span className="ml-1.5 font-bold text-xl">BotX</span>
            </Link>
            <p className="mt-2 text-muted-foreground text-sm">
              The fastest AI BotX for all your needs.
            </p>
          </div>

          {footerLinks.map(({ section, links }) => (
            <div key={section}>
              <h3 className="mb-4 font-semibold text-sm text-white uppercase tracking-wider">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, link }) => (
                  <li key={label}>
                    <Link
                      className="text-muted-foreground text-sm transition-colors hover:text-primary"
                      href={link}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-xs">
            &copy; {currentYear} BotX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
