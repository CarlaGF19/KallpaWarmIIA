export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { chatOnceGemini, Msg } from "@/ai/providers/gemini";

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
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "messages debe ser array" }, { status: 400 });
    }
    const reply = await chatOnceGemini(messages as Msg[], params);
    const dt = Date.now() - t0;
    return NextResponse.json({ reply }, { headers: { "X-Response-Time": `${dt}ms` } });
  } catch (e: any) {
    const status = e?.status || e?.response?.status || 500;
    let detail = e?.message || "Error";
    try { detail = await e?.response?.text?.() ?? detail; } catch {}
    console.error("API /chat", status, detail);
    return NextResponse.json({ error: detail }, { status });
  }
}
