import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://botx.ai", // Optional, for including your app on openrouter.ai rankings.
          "X-Title": "BotX", // Optional. Shows in rankings on openrouter.ai.
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [
            {
              role: "system",
              content:
                "You are a professional prompt engineer. Your task is to enhance the user's prompt to be more detailed, clear, and effective for an AI model. Only return the enhanced prompt, nothing else. Do not add quotes or explanations.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[OPENROUTER_ERROR]", response.status, errorText);
      throw new Error(`Failed to fetch from OpenRouter: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const enhancedPrompt = data.choices[0].message.content.trim();

    return NextResponse.json({ enhancedPrompt });
  } catch (error) {
    console.error("[ENHANCE_PROMPT_ERROR]", error);
    
    if (error instanceof Error && error.message.includes("data policy")) {
        return new NextResponse("To use free models, enable data logging in OpenRouter settings.", { status: 403 });
    }

    return new NextResponse(error instanceof Error ? error.message : "Internal Error", { status: 500 });
  }
}
