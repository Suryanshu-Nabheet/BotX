"use server";

import { generateText, type UIMessage } from "ai";
import { cookies } from "next/headers";
import { titlePrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { getTextFromMessage } from "@/lib/utils";

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("chat-model", model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const { text: title } = await generateText({
    model: myProvider.languageModel("title-model"),
    system: titlePrompt,
    prompt: getTextFromMessage(message),
  });

  return title;
}

// Database-dependent functions removed - no longer needed
export async function deleteTrailingMessages({ id }: { id: string }) {
  // No-op: database removed
  return;
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: string;
}) {
  // No-op: database removed
  return;
}
