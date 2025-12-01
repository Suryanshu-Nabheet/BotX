import { z } from "zod";

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  messages: z.array(z.object({
    id: z.string(),
    role: z.enum(["system", "user", "assistant", "data", "tool"]),
    content: z.string().optional(),
    toolInvocations: z.array(z.any()).optional(),
    // Parts can be any structure - AI SDK uses various internal types
    // like "text", "image", "file", "step-start", "step-finish", "data-usage", etc.
    parts: z.array(z.any()).optional(),
  })),
  selectedChatModel: z.string(),
  selectedVisibilityType: z.enum(["public", "private"]),
  selectedMode: z.enum(["general", "coding", "reasoning", "vision"]).optional(),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
