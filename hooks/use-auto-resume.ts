"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { useDataStream } from "@/components/data-stream-provider";
import type { ChatMessage } from "@/lib/types";

export type UseAutoResumeParams = {
  autoResume: boolean;
  initialMessages: ChatMessage[];
  resumeStream: UseChatHelpers<ChatMessage>["resumeStream"];
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
};

export function useAutoResume({
  autoResume,
  initialMessages,
  resumeStream,
  setMessages,
}: UseAutoResumeParams) {
  const { dataStream } = useDataStream();

  useEffect(() => {
    if (!autoResume) {
      return;
    }

    const mostRecentMessage = initialMessages.at(-1);

    if (mostRecentMessage?.role === "user") {
      resumeStream();
    }

    // we intentionally run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoResume, initialMessages.at, resumeStream]);

  const processedIndicesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!dataStream) {
      return;
    }

    dataStream.forEach((dataPart, index) => {
      if (processedIndicesRef.current.has(index)) {
        return;
      }

      if (dataPart.type === "data-appendMessage") {
        const message = JSON.parse(dataPart.data);
        setMessages((currentMessages) => {
          if (currentMessages.some((m) => m.id === message.id)) {
            return currentMessages;
          }
          return [...currentMessages, message];
        });
      }

      processedIndicesRef.current.add(index);
    });
  }, [dataStream, setMessages]);
}
