"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2 p-4"
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="text-center text-muted-foreground text-sm">
        Chat history not available
      </div>
      <Button
        className="w-full justify-start gap-2"
        onClick={() => {
          router.push("/ask");
          router.refresh();
        }}
        variant="outline"
      >
        <PlusIcon />
        New Chat
      </Button>
    </motion.div>
  );
}

export function getChatHistoryPaginationKey() {
  return "chat-history";
}
