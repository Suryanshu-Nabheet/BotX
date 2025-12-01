"use client";

import { type ComponentProps, memo } from "react";
import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";
import { useSmoothStreaming } from "@/hooks/use-smooth-streaming";

type ResponseProps = ComponentProps<typeof Streamdown> & {
  isStreaming?: boolean;
};

export const Response = memo(
  ({ className, isStreaming = false, children, ...props }: ResponseProps) => {
    const text = typeof children === "string" ? children : "";
    const smoothedText = useSmoothStreaming(text, isStreaming);

    return (
      <Streamdown
        className={cn(
          "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_code]:whitespace-pre-wrap [&_code]:break-words [&_pre]:max-w-full [&_pre]:overflow-x-auto",
          className
        )}
        {...props}
      >
        {smoothedText}
      </Streamdown>
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.isStreaming === nextProps.isStreaming
);

Response.displayName = "Response";
