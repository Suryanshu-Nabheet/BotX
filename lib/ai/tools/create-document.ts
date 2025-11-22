import { tool } from "ai";
import { z } from "zod";

export const createDocument = tool({
  description: "Create a new document with title and content",
  inputSchema: z.object({
    title: z.string().describe("The title of the document"),
    content: z.string().describe("The content of the document"),
  }),
  execute: async ({ title, content }) => {
    // No database - just return a temporary ID
    const id = crypto.randomUUID();

    return {
      id,
      title,
      content,
      kind: "text" as const,
    };
  },
});
