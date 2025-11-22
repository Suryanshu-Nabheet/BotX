import { tool } from "ai";
import { z } from "zod";

export const updateDocument = tool({
  description: "Update a document with new content",
  inputSchema: z.object({
    id: z.string().describe("The ID of the document to update"),
    description: z.string().describe("Description of the update"),
    content: z.string().describe("The new content"),
  }),
  execute: async ({ id, description, content }) => {
    // No database - just return the updated content
    return {
      id,
      description,
      content,
      kind: "text" as const,
    };
  },
});
