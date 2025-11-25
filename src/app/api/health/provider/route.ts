export const runtime = "nodejs";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    provider: (process.env.PROVIDER ?? "gemini").toLowerCase(),
    geminiKey: !!process.env.GEMINI_API_KEY ? "present" : "missing",
    googleKey: !!process.env.GOOGLE_API_KEY ? "present" : "missing",
    model: process.env.GEMINI_MODEL || process.env.GOOGLE_MODEL || "gemini-2.5-flash",
  });
}
