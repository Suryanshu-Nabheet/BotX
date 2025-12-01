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
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useWindowSize } from "usehooks-ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chatModels, getModelLogo } from "@/lib/ai/models";
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
  chatId,
  input,
  setInput,
  status,
  stop,
  attachments,
  setAttachments,
  sendMessage,
  className,
  selectedModelId,
  onModelChange,
}: {
  chatId: string;
  input: string;
  setInput: (value: string) => void;
  status: string;
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<ChatMessage>;
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
  sendMessage: (message: ChatMessage, options?: any) => Promise<any>;
  className?: string;
  selectedModelId?: string;
  onModelChange?: (modelId: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const { width } = useWindowSize();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitForm();
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
      } as any
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
          ...(successfullyUploadedAttachments as Array<Attachment>),
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
        setInput(input + (input ? " " : "") + finalTranscript);
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
      <motion.div
        className={cn(
          "relative flex w-full flex-col rounded-xl border border-input bg-background p-2 shadow-sm transition-all duration-200 ease-in-out focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-md",
          className
        )}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          role="presentation"
        >
          <Textarea
            autoComplete="off"
            autoCorrect="off"
            className="min-h-[60px] w-full resize-none border-0 bg-transparent p-0 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            data-1p-ignore="true"
            data-bw-ignore="true"
            data-form-type="other"
            data-lpignore="true"
            id="chat-input-field"
            name="chat-input-field"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            ref={textareaRef}
            rows={1}
            spellCheck={false}
            value={input}
          />
        </form>

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
              asChild
              className="size-8 text-muted-foreground hover:text-foreground"
              disabled={uploadQueue.length > 0}
              onClick={() => fileInputRef.current?.click()}
              size="icon"
              variant="ghost"
            >
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <PaperclipIcon size={18} />
              </motion.button>
            </Button>

            <Button
              asChild
              className={cn(
                "size-8 text-muted-foreground hover:text-foreground",
                isListening && "animate-pulse text-red-500"
              )}
              onClick={toggleSpeechRecognition}
              size="icon"
              variant="ghost"
            >
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <MicIcon size={18} />
              </motion.button>
            </Button>

            <Button
              asChild
              className={cn(
                "size-8 text-muted-foreground hover:text-foreground",
                isEnhancing && "animate-spin"
              )}
              disabled={isEnhancing || !input.trim()}
              onClick={enhancePrompt}
              size="icon"
              variant="ghost"
            >
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SparklesIcon size={18} />
              </motion.button>
            </Button>

            {selectedModelId && onModelChange && (
              <Select onValueChange={onModelChange} value={selectedModelId}>
                <SelectTrigger className="h-8 w-fit border-none bg-muted/50 px-2 font-medium text-muted-foreground text-xs hover:bg-muted hover:text-foreground focus:ring-0">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent align="start" className="w-[240px]">
                  {chatModels.map((model) => (
                    <SelectItem
                      className="text-xs"
                      key={model.id}
                      value={model.id}
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative size-4 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={model.name}
                            className="object-contain"
                            src={getModelLogo(model.id)}
                          />
                        </div>
                        <span>{model.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex flex-row items-center gap-2">
            {status === "streaming" ? (
              <Button
                asChild
                className="size-8 rounded-full p-0"
                onClick={stop}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <StopIcon size={14} />
                </motion.button>
              </Button>
            ) : (
              <Button
                asChild
                className="size-8 rounded-full p-0"
                disabled={!input.trim() && attachments.length === 0}
                onClick={submitForm}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowUpIcon size={14} />
                </motion.button>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
