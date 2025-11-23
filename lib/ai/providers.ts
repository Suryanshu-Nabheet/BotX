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
    "moonshotai/kimi-k2:free": openrouter("moonshotai/kimi-k2:free"),
    "meta-llama/llama-3.2-3b-instruct:free": openrouter(
      "meta-llama/llama-3.2-3b-instruct:free"
    ),
    "arliai/qwq-32b-arliai-rpr-v1:free": openrouter(
      "arliai/qwq-32b-arliai-rpr-v1:free"
    ),
    "google/gemma-3-4b-it:free": openrouter("google/gemma-3-4b-it:free"),
    "qwen/qwen3-4b-it:free": openrouter("qwen/qwen3-4b-it:free"),
    "google/gemma-3-12b-it:free": openrouter("google/gemma-3-12b-it:free"),
    "google/gemma-3n-2b-it:free": openrouter("google/gemma-3n-2b-it:free"),
    "google/gemma-3n-4b-it:free": openrouter("google/gemma-3n-4b-it:free"),
    "mistralai/mistral-small-3.1-24b-instruct:free": openrouter(
      "mistralai/mistral-small-3.1-24b-instruct:free"
    ),
    "chat-model": openrouter("meta-llama/llama-3.2-3b-instruct:free"),
    "chat-model-reasoning": openrouter(
      "google/gemini-2.0-flash-thinking-exp:free"
    ),
    "title-model": openrouter("meta-llama/llama-3.1-8b-instruct:free"),
    "artifact-model": openrouter("meta-llama/llama-3.1-8b-instruct:free"),
  },
});
