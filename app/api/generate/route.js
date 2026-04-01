import Anthropic from "@anthropic-ai/sdk";
import { MODULE_MAP } from "../../../lib/modules";

export async function POST(request) {
  const { moduleId, userPrompt } = await request.json();

  if (!moduleId || !userPrompt) {
    return new Response("Missing required fields", { status: 400 });
  }

  const mod = MODULE_MAP[moduleId];
  if (!mod) {
    return new Response("Invalid module ID", { status: 400 });
  }

  const systemPrompt = mod.systemPrompt;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response("ANTHROPIC_API_KEY not configured", { status: 500 });
  }

  const client = new Anthropic({ apiKey });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 2000,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
          stream: true,
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        const message =
          err?.status >= 400 && err?.status < 500
            ? "Generation failed. Please try again."
            : "An unexpected error occurred. Please try again.";
        controller.enqueue(encoder.encode(`\n\n[Error: ${message}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
