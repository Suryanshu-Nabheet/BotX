"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import {
  type ChangeEvent,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import type { Attachment, ChatMessage } from "@/lib/types";
import { uploadFile } from "@/lib/upload";
import { cn } from "@/lib/utils";
import {
  ArrowUpIcon,
  MicIcon,
  PaperclipIcon,
  SparklesIcon,
  StopIcon,
} from "./icons";
import { PreviewAttachment } from "./preview-attachment";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function MultimodalInput({
  input,
  setInput,
  status,
  stop,
  attachments,
  setAttachments,
  sendMessage,
  className,
}: {
  chatId: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  status: UseChatHelpers<ChatMessage>["status"];
  stop: () => void;
  attachments: Attachment[];
  setAttachments: Dispatch<SetStateAction<Attachment[]>>;
  messages: ChatMessage[];
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const { width } = useWindowSize();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, [input]);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (status === "streaming") {
        toast.error("Please wait for the model to finish its response!");
      } else if (input.trim() || attachments.length > 0) {
        submitForm();
      }
    }
  };

  const submitForm = useCallback(() => {
    if (input.trim() === "" && attachments.length === 0) return;

    sendMessage(
      {
        role: "user",
        content: input,
      } as any,
      {
        data: {
          attachments: attachments as any,
        },
      }
    );

    setAttachments([]);
    setInput("");
    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [input, attachments, sendMessage, setAttachments, setInput, width]);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      setUploadQueue(files.map((file) => file.name));

      try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment): attachment is Attachment => attachment !== undefined
        );

        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...successfullyUploadedAttachments,
        ]);
      } catch (error) {
        console.error("Error uploading files!", error);
        toast.error("Failed to upload files");
      } finally {
        setUploadQueue([]);
      }
    },
    [setAttachments]
  );

  const enhancePrompt = async () => {
    if (!input.trim()) {
      toast.error("Please enter a prompt to enhance");
      return;
    }

    setIsEnhancing(true);
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to enhance prompt");
      }

      const data = await response.json();
      setInput(data.enhancedPrompt);
      toast.success("Prompt enhanced!");
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      toast.error("Failed to enhance prompt");
    } finally {
      setIsEnhancing(false);
    }
  };

  const toggleSpeechRecognition = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInput((prev) => prev + (prev ? " " : "") + finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      toast.error("Speech recognition error");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="relative flex w-full flex-col gap-2">
      {attachments.length > 0 && (
        <div className="flex flex-row gap-2 overflow-x-auto p-2">
          {attachments.map((attachment) => (
            <PreviewAttachment
              attachment={attachment}
              key={attachment.url}
              onRemove={() =>
                setAttachments((prev) =>
                  prev.filter((a) => a.url !== attachment.url)
                )
              }
            />
          ))}
        </div>
      )}

      <div
        className={cn(
          "relative flex w-full flex-col rounded-xl border bg-background p-3 shadow-sm transition-all duration-200",
          "focus-within:border-ring focus-within:ring-1 focus-within:ring-ring",
          className
        )}
      >
        <Textarea
          className="min-h-[60px] w-full resize-none border-0 bg-transparent p-0 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          ref={textareaRef}
          rows={1}
          value={input}
        />

        <div className="mt-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <input
              className="hidden"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              type="file"
            />
            <Button
              className="size-8 text-muted-foreground hover:text-foreground"
              disabled={uploadQueue.length > 0}
              onClick={() => fileInputRef.current?.click()}
              size="icon"
              variant="ghost"
            >
              <PaperclipIcon size={18} />
            </Button>

            <Button
              className={cn(
                "size-8 text-muted-foreground hover:text-foreground",
                isListening && "animate-pulse text-red-500"
              )}
              onClick={toggleSpeechRecognition}
              size="icon"
              variant="ghost"
            >
              <MicIcon size={18} />
            </Button>

            <Button
              className={cn(
                "size-8 text-muted-foreground hover:text-foreground",
                isEnhancing && "animate-spin"
              )}
              disabled={isEnhancing || !input.trim()}
              onClick={enhancePrompt}
              size="icon"
              variant="ghost"
            >
              <SparklesIcon size={18} />
            </Button>
          </div>

          <div className="flex flex-row items-center gap-2">
            {status === "streaming" ? (
              <Button className="size-8 rounded-full p-0" onClick={stop}>
                <StopIcon size={14} />
              </Button>
            ) : (
              <Button
                className="size-8 rounded-full p-0"
                disabled={!input.trim() && attachments.length === 0}
                onClick={submitForm}
              >
                <ArrowUpIcon size={14} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
