"use server";

export async function getSuggestions({ documentId }: { documentId: string }) {
  // No database - return empty suggestions
  return [];
}
