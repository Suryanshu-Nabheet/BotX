import { currentUser } from "@clerk/nextjs/server";
import { geolocation } from "@vercel/functions";

import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  stepCountIs,
  streamText,
} from "ai";

import { unstable_cache as cache } from "next/cache";
import type { ModelCatalog } from "tokenlens/core";
import { fetchModels } from "tokenlens/fetch";
import { getUsage } from "tokenlens/helpers";
import type { ChatModel } from "@/lib/ai/models";
import { type RequestHints, systemPrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { isProductionEnvironment } from "@/lib/constants";
import { ChatSDKError } from "@/lib/errors";
import type { ChatMessage } from "@/lib/types";
import type { AppUsage } from "@/lib/usage";
import { generateUUID } from "@/lib/utils";
import { type PostRequestBody, postRequestBodySchema } from "./schema";

export const maxDuration = 60;

const getTokenlensCatalog = cache(
  async (): Promise<ModelCatalog | undefined> => {
    try {
      return await fetchModels();
    } catch (err) {
      console.warn(
        "TokenLens: catalog fetch failed, using default catalog",
        err
      );
      return;
    }
  },
  ["tokenlens-catalog"],
  { revalidate: 24 * 60 * 60 }
);

export async function POST(request: Request) {
  let requestBody: PostRequestBody;
  let json: any;

  try {
    json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (error) {
    console.error("[CHAT_API_ERROR] Schema validation failed:", error);
    if (json) {
      console.error("[CHAT_API_ERROR] Request body keys:", Object.keys(json));
      console.error("[CHAT_API_ERROR] Messages:", json.messages?.length || 0);
    }
    return new ChatSDKError("bad_request:api").toResponse();
  }

  try {
    const {
      messages,
      selectedChatModel,
      selectedMode,
    }: {
      id: string;
      messages: Array<any>;
      selectedChatModel: ChatModel["id"];
      selectedMode?: "general" | "coding" | "reasoning" | "vision";
    } = requestBody;

    const user = await currentUser();

    if (!user) {
      return new ChatSDKError("unauthorized:chat").toResponse();
    }

    // Validate messages array
    if (!messages || !Array.isArray(messages)) {
      console.error("[CHAT_API_ERROR] Invalid messages - not an array");
      return new ChatSDKError("bad_request:api").toResponse();
    }

    if (messages.length === 0) {
      console.error("[CHAT_API_ERROR] No messages provided");
      return new ChatSDKError("bad_request:api").toResponse();
    }

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    let finalMergedUsage: AppUsage | undefined;

    const sysPrompt = systemPrompt({
      selectedChatModel,
      selectedMode,
      requestHints,
    });

    const isGemma = selectedChatModel.includes("gemma");

    // The AI SDK's convertToModelMessages expects UIMessage format
    // which is what we receive from the client
    let modelMessages = convertToModelMessages(messages as any);

    if (isGemma) {
      modelMessages = [
        { role: "user", content: `System Instructions:\n${sysPrompt}` },
        ...modelMessages,
      ];
    }

    const stream = createUIMessageStream({
      execute: ({ writer: dataStream }) => {
        const result = streamText({
          model: myProvider.languageModel(selectedChatModel),
          system: isGemma ? undefined : sysPrompt,
          messages: modelMessages,
          stopWhen: stepCountIs(5),
          // experimental_activeTools:
          //   selectedChatModel === "chat-model-reasoning"
          //     ? []
          //     : [
          //         "getWeather",
          //         "createDocument",
          //         "updateDocument",
          //         "requestSuggestions",
          //       ],
          // experimental_telemetry: {
          //   isEnabled: isProductionEnvironment,
          //   functionId: "stream-text",
          // },
          onFinish: async ({ usage }) => {
            try {
              const providers = await getTokenlensCatalog();
              const modelId =
                myProvider.languageModel(selectedChatModel).modelId;
              if (!modelId) {
                finalMergedUsage = usage;
                dataStream.write({
                  type: "data-usage",
                  data: finalMergedUsage,
                });
                return;
              }

              if (!providers) {
                finalMergedUsage = usage;
                dataStream.write({
                  type: "data-usage",
                  data: finalMergedUsage,
                });
                return;
              }

              const summary = getUsage({ modelId, usage, providers });
              finalMergedUsage = { ...usage, ...summary, modelId } as AppUsage;
              dataStream.write({ type: "data-usage", data: finalMergedUsage });
            } catch (err) {
              console.warn("TokenLens enrichment failed", err);
              finalMergedUsage = usage;
              dataStream.write({ type: "data-usage", data: finalMergedUsage });
            }
          },
        });

        result.consumeStream();

        dataStream.merge(
          result.toUIMessageStream({
            sendReasoning: true,
          })
        );
      },
      generateId: generateUUID,
      onFinish: async ({ messages }) => {
        // No database - messages not persisted
      },
      onError: () => {
        return "Oops, an error occurred!";
      },
    });

    return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
  } catch (error) {
    const vercelId = request.headers.get("x-vercel-id");

    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }

    // Handle OpenRouter specific errors regarding data policy
    if (
      error instanceof Error &&
      (error.message.includes("No endpoints found matching your data policy") ||
        JSON.stringify(error).includes(
          "No endpoints found matching your data policy"
        ))
    ) {
      console.warn("OpenRouter data policy error:", error);
      return Response.json(
        {
          message:
            "To use free models, you must enable data logging in OpenRouter settings. Go to https://openrouter.ai/settings/privacy and enable 'Allow inputs and outputs to be stored'.",
        },
        { status: 403 }
      );
    }

    console.error("Unhandled error in chat API:", error, { vercelId });
    return new ChatSDKError("offline:chat").toResponse();
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  const user = await currentUser();

  if (!user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }

  // No database - just return success
  return Response.json({ success: true }, { status: 200 });
}
