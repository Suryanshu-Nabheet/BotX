import { createOpenAI } from "@ai-sdk/openai";
import { customProvider } from "ai";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const myProvider = customProvider({
  languageModels: {
    "chat-model": openrouter("deepseek/deepseek-chat"),
    "chat-model-reasoning": openrouter("deepseek/deepseek-reasoner"),
    "title-model": openrouter("meta-llama/llama-3.1-8b-instruct:free"),
    "artifact-model": openrouter("meta-llama/llama-3.1-8b-instruct:free"),
  },
});
