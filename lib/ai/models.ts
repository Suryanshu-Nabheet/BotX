export const DEFAULT_CHAT_MODEL: string =
  "meta-llama/llama-3.2-3b-instruct:free";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "meta-llama/llama-3.2-3b-instruct:free",
    name: "Llama 3.2 3B Instruct",
    description: "Meta (Free)",
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct:free",
    name: "Llama 3.3 70B Instruct",
    description: "Meta (Free)",
  },
  {
    id: "google/gemma-2-9b-it:free",
    name: "Gemma 2 9B",
    description: "Google (Free)",
  },
  {
    id: "google/gemma-3-4b-it:free",
    name: "Gemma 3 4B",
    description: "Google (Free)",
  },
  {
    id: "google/gemma-3-12b-it:free",
    name: "Gemma 3 12B",
    description: "Google (Free)",
  },
  {
    id: "google/gemma-3-27b-it:free",
    name: "Gemma 3 27B",
    description: "Google (Free)",
  },
  {
    id: "deepseek/deepseek-chat:free",
    name: "DeepSeek Chat",
    description: "DeepSeek (Free)",
  },
  {
    id: "deepseek/deepseek-r1:free",
    name: "DeepSeek R1",
    description: "DeepSeek (Free)",
  },
  {
    id: "qwen/qwen-2.5-7b-instruct:free",
    name: "Qwen 2.5 7B Instruct",
    description: "Qwen (Free)",
  },
  {
    id: "qwen/qwen-2.5-72b-instruct:free",
    name: "Qwen 2.5 72B Instruct",
    description: "Qwen (Free)",
  },
  {
    id: "mistralai/mistral-7b-instruct:free",
    name: "Mistral 7B Instruct",
    description: "Mistral AI (Free)",
  },
  {
    id: "microsoft/phi-3-mini-128k-instruct:free",
    name: "Phi-3 Mini 128K",
    description: "Microsoft (Free)",
  },
  {
    id: "microsoft/phi-3-medium-128k-instruct:free",
    name: "Phi-3 Medium 128K",
    description: "Microsoft (Free)",
  },
  {
    id: "openchat/openchat-7b:free",
    name: "OpenChat 7B",
    description: "OpenChat (Free)",
  },
  {
    id: "nousresearch/hermes-3-llama-3.1-405b:free",
    name: "Hermes 3 - Llama 3.1 405B",
    description: "Nous Research (Free)",
  },
];
