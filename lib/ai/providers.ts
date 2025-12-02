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
    // Free models from models.ts
    "meta-llama/llama-3.2-3b-instruct:free": openrouter(
      "meta-llama/llama-3.2-3b-instruct:free"
    ),
    "meta-llama/llama-3.3-70b-instruct:free": openrouter(
      "meta-llama/llama-3.3-70b-instruct:free"
    ),
    "google/gemma-2-9b-it:free": openrouter("google/gemma-2-9b-it:free"),
    "google/gemma-3-4b-it:free": openrouter("google/gemma-3-4b-it:free"),
    "google/gemma-3-12b-it:free": openrouter("google/gemma-3-12b-it:free"),
    "google/gemma-3-27b-it:free": openrouter("google/gemma-3-27b-it:free"),
    "google/gemma-3n-2b-it:free": openrouter("google/gemma-3n-2b-it:free"),
    "google/gemma-3n-4b-it:free": openrouter("google/gemma-3n-4b-it:free"),
    "deepseek/deepseek-chat:free": openrouter("deepseek/deepseek-chat:free"),
    "deepseek/deepseek-r1:free": openrouter("deepseek/deepseek-r1:free"),
    "qwen/qwen-2.5-7b-instruct:free": openrouter(
      "qwen/qwen-2.5-7b-instruct:free"
    ),
    "qwen/qwen-2.5-72b-instruct:free": openrouter(
      "qwen/qwen-2.5-72b-instruct:free"
    ),
    "qwen/qwen3-4b:free": openrouter("qwen/qwen3-4b:free"),
    "mistralai/mistral-7b-instruct:free": openrouter(
      "mistralai/mistral-7b-instruct:free"
    ),
    "mistralai/mistral-small-3.1-24b:free": openrouter(
      "mistralai/mistral-small-3.1-24b:free"
    ),
    "microsoft/phi-3-mini-128k-instruct:free": openrouter(
      "microsoft/phi-3-mini-128k-instruct:free"
    ),
    "microsoft/phi-3-medium-128k-instruct:free": openrouter(
      "microsoft/phi-3-medium-128k-instruct:free"
    ),
    "openchat/openchat-7b:free": openrouter("openchat/openchat-7b:free"),
    "nousresearch/hermes-3-llama-3.1-405b:free": openrouter(
      "nousresearch/hermes-3-llama-3.1-405b:free"
    ),
    "moonshotai/kimi-k2-0711:free": openrouter("moonshotai/kimi-k2-0711:free"),
    "nvidia/llama-3.1-nemotron-70b-instruct:free": openrouter(
      "nvidia/llama-3.1-nemotron-70b-instruct:free"
    ),
    "liquid/lfm-40b:free": openrouter("liquid/lfm-40b:free"),

    // Internal models for utilities
    "chat-model": openrouter("meta-llama/llama-3.2-3b-instruct:free"),
    "chat-model-reasoning": openrouter(
      "google/gemini-2.0-flash-thinking-exp:free"
    ),
    "title-model": openrouter("meta-llama/llama-3.1-8b-instruct:free"),
    "artifact-model": openrouter("meta-llama/llama-3.1-8b-instruct:free"),
  },
});
