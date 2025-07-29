import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const result = streamText({
      model: openai("gpt-4"),
      messages: [...messages.filter(msg => msg.role === "user")],
    });
    console.log("message", result.toDataStreamResponse());
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch response from OpenAI" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

