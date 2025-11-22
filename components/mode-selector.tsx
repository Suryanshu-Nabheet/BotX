"use client";

import { Code, Eye, MessageSquare, Zap } from "lucide-react";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type ChatMode = "general" | "coding" | "reasoning" | "vision";

interface ModeSelectorProps {
  selectedMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

const modes: { id: ChatMode; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: MessageSquare },
  { id: "coding", label: "Coding", icon: Code },
  { id: "reasoning", label: "Reasoning", icon: Zap },
  { id: "vision", label: "Vision", icon: Eye },
];

export function ModeSelector({
  selectedMode,
  onModeChange,
}: ModeSelectorProps) {
  const selected = modes.find((m) => m.id === selectedMode) || modes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="gap-2 border-primary/20 bg-background/50 transition-all hover:border-primary/40 hover:bg-accent"
          size="sm"
          variant="outline"
        >
          <selected.icon className="h-4 w-4 text-primary" />
          <span className="hidden font-medium sm:inline">{selected.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {modes.map((mode) => (
          <DropdownMenuItem
            className={cn(
              "cursor-pointer gap-2 transition-colors",
              mode.id === selectedMode &&
                "bg-primary/10 font-medium text-primary"
            )}
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
          >
            <mode.icon className="h-4 w-4" />
            {mode.label}
            {mode.id === selectedMode && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
