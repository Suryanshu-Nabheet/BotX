export type UserType = "guest" | "regular";

import type { ChatModel } from "./models";

type Entitlements = {
  maxMessagesPerDay: number;
  availableChatModelIds: ChatModel["id"][];
};

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: [
      "moonshotai/kimi-k2:free",
      "meta-llama/llama-3.2-3b-instruct:free",
      "arliai/qwq-32b-arliai-rpr-v1:free",
      "google/gemma-3-4b-it:free",
      "qwen/qwen3-4b-it:free",
      "google/gemma-3-12b-it:free",
      "google/gemma-3n-2b-it:free",
      "google/gemma-3n-4b-it:free",
      "mistralai/mistral-small-3.1-24b-instruct:free",
    ],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: [
      "moonshotai/kimi-k2:free",
      "meta-llama/llama-3.2-3b-instruct:free",
      "arliai/qwq-32b-arliai-rpr-v1:free",
      "google/gemma-3-4b-it:free",
      "qwen/qwen3-4b-it:free",
      "google/gemma-3-12b-it:free",
      "google/gemma-3n-2b-it:free",
      "google/gemma-3n-4b-it:free",
      "mistralai/mistral-small-3.1-24b-instruct:free",
    ],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
