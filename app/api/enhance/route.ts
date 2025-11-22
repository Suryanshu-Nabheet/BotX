import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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
          model: "meta-llama/llama-3.1-70b-instruct:free",
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
      throw new Error("Failed to fetch from OpenRouter");
    }

    const data = await response.json();
    const enhancedPrompt = data.choices[0].message.content.trim();

    return NextResponse.json({ enhancedPrompt });
  } catch (error) {
    console.error("[ENHANCE_PROMPT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
