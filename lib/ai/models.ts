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
    id: "google/gemma-3-4b-it:free",
    name: "Gemma 3 4B",
    description: "Google (Free)",
  },
  {
    id: "google/gemma-3-12b-it:free",
    name: "Gemma 3 12B",
    description: "Google (Free)",
  },
];
