"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "./icons";

export function SidebarHistory() {
  const router = useRouter();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!user || !mounted) {
    return null;
  }

  // No database - no history to display
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="text-center text-muted-foreground text-sm">
        Chat history not available
      </div>
      <Button
        onClick={() => {
          router.push("/ask");
          router.refresh();
        }}
        variant="outline"
      >
        <PlusIcon />
        New Chat
      </Button>
    </div>
  );
}

export function getChatHistoryPaginationKey() {
  return "chat-history";
}
