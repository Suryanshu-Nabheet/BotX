export const DEFAULT_CHAT_MODEL: string = "kimi-k2-free";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "kimi-k2-free",
    name: "Kimi K2 0711",
    description: "MoonshotAI (Free)",
  },
  {
    id: "llama-3.2-3b-free",
    name: "Llama 3.2 3B",
    description: "Meta (Free)",
  },
  {
    id: "qwq-32b-free",
    name: "QwQ 32B RpR v1",
    description: "ArliAI (Free)",
  },
  {
    id: "gemma-3-4b-free",
    name: "Gemma 3 4B",
    description: "Google (Free)",
  },
  {
    id: "qwen3-4b-free",
    name: "Qwen3 4B",
    description: "Qwen (Free)",
  },
  {
    id: "gemma-3-12b-free",
    name: "Gemma 3 12B",
    description: "Google (Free)",
  },
  {
    id: "gemma-3n-2b-free",
    name: "Gemma 3n 2B",
    description: "Google (Free)",
  },
  {
    id: "gemma-3n-4b-free",
    name: "Gemma 3n 4B",
    description: "Google (Free)",
  },
];
