import { createOpenAI } from "@ai-sdk/openai";
import { customProvider } from "ai";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "BotX",
  },
});

export const myProvider = customProvider({
  languageModels: {
    "kimi-k2-free": openrouter("moonshotai/kimi-k2:free"),
    "llama-3.2-3b-free": openrouter("meta-llama/llama-3.2-3b-instruct:free"),
    "qwq-32b-free": openrouter("arliai/qwq-32b-arliai-rpr-v1:free"),
    "gemma-3-4b-free": openrouter("google/gemma-3-4b-it:free"),
    "qwen3-4b-free": openrouter("qwen/qwen3-4b-04-28:free"),
    "gemma-3-12b-free": openrouter("google/gemma-3-12b-it:free"),
    "gemma-3n-2b-free": openrouter("google/gemma-3n-2b-it:free"),
    "gemma-3n-4b-free": openrouter("google/gemma-3n-4b-it:free"),
    "chat-model": openrouter("meta-llama/llama-3.2-3b-instruct:free"),
    "chat-model-reasoning": openrouter(
      "google/gemini-2.0-flash-thinking-exp:free"
    ),
    "title-model": openrouter("meta-llama/llama-3.1-8b-instruct:free"),
    "artifact-model": openrouter("meta-llama/llama-3.1-8b-instruct:free"),
  },
});
