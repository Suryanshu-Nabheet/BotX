export type UserType = "regular";

import type { ChatModel } from "./models";

type Entitlements = {
  maxMessagesPerDay: number;
  availableChatModelIds: ChatModel["id"][];
};

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users with an account (all users, since Clerk auth is required)
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: [
      "meta-llama/llama-3.2-3b-instruct:free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "google/gemma-2-9b-it:free",
      "google/gemma-3-4b-it:free",
      "google/gemma-3-12b-it:free",
      "google/gemma-3-27b-it:free",
      "deepseek/deepseek-chat:free",
      "deepseek/deepseek-r1:free",
      "qwen/qwen-2.5-7b-instruct:free",
      "qwen/qwen-2.5-72b-instruct:free",
      "mistralai/mistral-7b-instruct:free",
      "microsoft/phi-3-mini-128k-instruct:free",
      "microsoft/phi-3-medium-128k-instruct:free",
      "openchat/openchat-7b:free",
      "nousresearch/hermes-3-llama-3.1-405b:free",
    ],
  },

  /*
   * TODO: For users with a paid membership
   * Uncomment when implementing premium features
   *
   * premium: {
   *   maxMessagesPerDay: -1, // unlimited
   *   availableChatModelIds: [...all models including paid ones],
   * },
   */
};
