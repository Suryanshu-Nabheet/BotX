export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "DeepSeek Chat",
    description: "Fast and efficient general purpose model (Free)",
  },
  {
    id: "chat-model-reasoning",
    name: "DeepSeek Reasoner",
    description: "Advanced reasoning capabilities (Free)",
  },
];
