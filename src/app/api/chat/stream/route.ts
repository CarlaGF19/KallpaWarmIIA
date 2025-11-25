export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { chatStreamGemini, Msg } from "@/ai/providers/gemini";

export async function POST(req: Request) {
  try {
    const t0 = Date.now();
    const body = await req.json();
    const messages = body?.messages ?? [];
    const params = {
      temperature: body?.temperature,
      topP: body?.top_p,
      topK: body?.top_k,
      maxOutputTokens: body?.max_output_tokens,
    };

    const rs = new ReadableStream({
      async start(controller) {
        const enc = new TextEncoder();
        try {
          for await (const token of chatStreamGemini(messages as Msg[], params)) {
            controller.enqueue(enc.encode(`data: ${JSON.stringify(token)}\n\n`));
          }
          controller.enqueue(enc.encode("event: done\ndata: {}\n\n"));
          controller.close();
        } catch (err: any) {
          const msg = err?.message || "stream error";
          controller.enqueue(enc.encode(`event: error\ndata: ${JSON.stringify(msg)}\n\n`));
          controller.close();
        }
      }
    });

    const dt = Date.now() - t0;
    return new NextResponse(rs, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Response-Time": `${dt}ms`,
      },
    });
  } catch (e: any) {
    const status = e?.status || e?.response?.status || 500;
    return NextResponse.json({ error: e?.message || "bootstrap error" }, { status });
  }
}
