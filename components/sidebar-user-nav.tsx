"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function SidebarUserNav() {
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isLoaded || !mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-3 p-2">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10 ring-2 ring-primary/20",
                userButtonPopoverCard: "shadow-xl",
                userButtonPopoverActionButton: "hover:bg-accent",
              },
            }}
            showName={false}
            userProfileMode="modal"
            userProfileProps={{
              appearance: {
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none",
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Action label="manageAccount" />
              <UserButton.Action label="signOut" />
            </UserButton.MenuItems>
          </UserButton>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate font-semibold text-sm">
              {user?.fullName || "User"}
            </span>
            <span className="truncate text-muted-foreground text-xs">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </motion.div>
  );
}
