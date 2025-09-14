export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { chatStreamGemini, Msg } from "@/ai/providers/gemini";

export async function POST(req: Request) {
  try {
    const { messages = [], temperature = 0.6 } = await req.json();

    const rs = new ReadableStream({
      async start(controller) {
        const enc = new TextEncoder();
        try {
          for await (const token of chatStreamGemini(messages as Msg[], temperature)) {
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

    return new NextResponse(rs, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (e: any) {
    const status = e?.status || e?.response?.status || 500;
    return NextResponse.json({ error: e?.message || "bootstrap error" }, { status });
  }
}
