
import "server-only";
import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type Msg = { role: "system" | "user" | "assistant"; content: string };
export type GenParams = { temperature?: number; topP?: number; topK?: number; maxOutputTokens?: number };

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) throw new Error("Falta GEMINI_API_KEY/GOOGLE_API_KEY en el entorno");
const genAIv2 = new GoogleGenAI({ apiKey });
const genAI = new GoogleGenerativeAI(apiKey);
const modelId = process.env.GEMINI_MODEL || process.env.GOOGLE_MODEL || "gemini-2.5-flash";

const cache = new Map<string, { t: number; v: string }>();
const CACHE_TTL = 60000;
const CACHE_MAX = 100;
function getCache(k: string) {
  const e = cache.get(k);
  if (!e) return undefined;
  if (Date.now() - e.t > CACHE_TTL) { cache.delete(k); return undefined; }
  return e.v;
}
function setCache(k: string, v: string) {
  cache.set(k, { t: Date.now(), v });
  if (cache.size > CACHE_MAX) { const fk = cache.keys().next().value as string; if (fk) cache.delete(fk); }
}

const SYSTEM = `Identidad (12–17): Eres KallpaWarmIA, mentora cálida y carismática para niñas y jóvenes STEAM.
Saludo inicial (solo primer turno): “¡Rimaykullayki! Hola. Soy KallpaWarmIA, tu mentora digital para conquistar el mundo STEM. ¿Deseas continuar en quechua o prefieres que hablemos en español? Elige: [Español] | [Quechua]”.
Modo breve: Responde ≤80–100 palabras o 3–4 líneas.
Estructura fija: 1) Empatía (1 línea). 2) 1 viñeta práctica (máx. 2 si es necesario). 3) 1 pregunta.
Sesgos: si hay desánimo/estereotipo, da 1 referente mujer STEAM (nombre + 1 línea) + 1 acción.
Emojis: 0–1. Idioma: mantén el elegido; si no es ES/QU, responde en español y aclara idiomas.
Errores: sin “mal/incorrecto”; reencuadre positivo. No repitas el saludo tras el primer turno.`;

function splitHistory(messages: Msg[]) {
  // 1) ¿ya contestó el asistente alguna vez?
  const hasAssistant = messages.some(m => m.role === "assistant");
  // 2) system externo (si lo usas además de systemInstruction)
  const sys = messages.find(m => m.role === "system")?.content;
  // 3) convierte historial para Gemini y separa el último user
  const history: { role:"user"|"model"; parts:{text:string}[] }[] = [];
  let lastUser = "";

  // Inserta system solo si existe (systemInstruction ya cubre el system global)
  if (sys) history.push({ role: "user", parts: [{ text: sys }] });

  messages.forEach((m, i) => {
    if (m.role === "system") return;
    if (m.role === "user") {
      if (i === messages.length - 1) lastUser = m.content;
      else history.push({ role: "user", parts: [{ text: m.content }] });
    } else {
      history.push({ role: "model", parts: [{ text: m.content }] });
    }
  });

  // Si es primer turno (sin respuestas previas), obliga al saludo
  const firstTurn = !hasAssistant;
  if (firstTurn) {
    lastUser =
      (lastUser ? lastUser + "\n\n" : "") +
      "PRIMER TURNO: Usa el saludo inicial EXACTO y espera elección de idioma antes de seguir.";
  }
  if (!lastUser) lastUser = "Continuemos.";

  return { history, lastUser };
}

export async function chatOnceGemini(messages: Msg[], params: GenParams = {}) {
  const { history, lastUser } = splitHistory(messages);
  const temperature = params.temperature ?? 0.6;
  const topP = params.topP ?? 0.85;
  const topK = params.topK ?? 40;
  const maxOutputTokens = params.maxOutputTokens ?? 512;
  const tryModels = [modelId, "gemini-2.0-flash", "gemini-1.5-flash"];
  let lastErr: any;
  for (const m of tryModels) {
    const key = `${m}|${temperature}|${topP}|${topK}|${lastUser}|${history.length}`;
    const c = getCache(key);
    if (c) return c;
    try {
      const res = await genAIv2.models.generateContent({
        model: m,
        contents: `${SYSTEM}\n\n${lastUser}`,
      });
      const txt = (res as any)?.text;
      if (txt) { setCache(key, txt); return txt; }
    } catch (e) {
      lastErr = e;
    }
    try {
      const model = genAI.getGenerativeModel({
        model: m,
        systemInstruction: SYSTEM,
        generationConfig: { temperature, topP, topK },
      });
      const chat = model.startChat({ history });
      const res = await chat.sendMessage(lastUser);
      const txt = res.response.text();
      if (txt) { setCache(key, txt); return txt; }
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export async function* chatStreamGemini(messages: Msg[], params: GenParams = {}) {
  const { history, lastUser } = splitHistory(messages);
  const temperature = params.temperature ?? 0.6;
  const topP = params.topP ?? 0.85;
  const topK = params.topK ?? 40;
  const maxOutputTokens = params.maxOutputTokens ?? 512;
  const tryModels = [modelId, "gemini-2.0-flash", "gemini-1.5-flash"];
  let stream;
  for (const m of tryModels) {
    try {
      const model = genAI.getGenerativeModel({
        model: m,
        systemInstruction: SYSTEM,
        generationConfig: { temperature, topP, topK },
      });
      const chat = model.startChat({ history });
      stream = await chat.sendMessageStream(lastUser);
      break;
    } catch {}
  }
  if (!stream) throw new Error("No se pudo iniciar el stream");
  for await (const chunk of (stream as any).stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}
