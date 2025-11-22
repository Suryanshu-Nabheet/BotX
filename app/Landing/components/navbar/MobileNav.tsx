import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { navLinks } from "@/constants";

import { Button } from "../ui/button";

const MobileNav = () => {
  return (
    <Drawer modal={false}>
      <DrawerTrigger asChild className="hidden max-md:flex">
        <Button size="icon" variant="ghost">
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="pb-5">
        <DrawerHeader className="w-full flex-row justify-between">
          <DrawerTitle>
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
          </DrawerTitle>
          <DrawerClose asChild>
            <Button size="icon" variant="ghost">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <ul className="my-2 flex flex-col items-start px-5">
          {navLinks.map((link) => (
            <Link
              className="w-full border-1 border-muted-foreground/20 px-2 py-4 font-medium text-muted-foreground text-sm transition-all first:rounded-t-lg last:rounded-b-lg even:border-y-0 hover:text-white"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        <DrawerFooter>
          <Button asChild className="mt-4 w-full rounded-full text-sm">
            <Link href="/ask">Try for free</Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
