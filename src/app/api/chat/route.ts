export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { chatOnceGemini, Msg } from "@/ai/providers/gemini";

export async function POST(req: Request) {
  try {
    const { messages = [], temperature = 0.6 } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "messages debe ser array" }, { status: 400 });
    }
    const reply = await chatOnceGemini(messages as Msg[], temperature);
    return NextResponse.json({ reply });
  } catch (e: any) {
    const status = e?.status || e?.response?.status || 500;
    let detail = e?.message || "Error";
    try { detail = await e?.response?.text?.() ?? detail; } catch {}
    console.error("API /chat", status, detail);
    return NextResponse.json({ error: detail }, { status });
  }
}
