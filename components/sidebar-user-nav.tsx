"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function SidebarUserNav() {
  const { theme, setTheme } = useTheme();
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
            },
          }}
        />
        <span className="truncate font-medium text-sm">
          {user?.fullName || user?.primaryEmailAddress?.emailAddress}
        </span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
