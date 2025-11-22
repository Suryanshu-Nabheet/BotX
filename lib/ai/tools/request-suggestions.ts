import { tool } from "ai";
import { z } from "zod";

export const requestSuggestions = tool({
  description: "Request suggestions for a document",
  inputSchema: z.object({
    documentId: z.string().describe("The ID of the document"),
  }),
  execute: async ({ documentId }) => {
    // No database - return empty suggestions
    return {
      id: crypto.randomUUID(),
      documentId,
      suggestions: [],
    };
  },
});
