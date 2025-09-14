
import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type Msg = { role: "system" | "user" | "assistant"; content: string };

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const modelId = process.env.GEMINI_MODEL || "gemini-1.5-flash";

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

export async function chatOnceGemini(messages: Msg[], temperature = 0.6) {
  const { history, lastUser } = splitHistory(messages);
  const model = genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: SYSTEM,
    generationConfig: { temperature, maxOutputTokens: 200, topP: 0.9, topK: 40 },
  });
  const chat = model.startChat({ history });
  const res = await chat.sendMessage(lastUser);
  return res.response.text();
}

export async function* chatStreamGemini(messages: Msg[], temperature = 0.6) {
  const { history, lastUser } = splitHistory(messages);
  const model = genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: SYSTEM,
    generationConfig: { temperature, maxOutputTokens: 200, topP: 0.9, topK: 40 },
  });
  const chat = model.startChat({ history });
  const stream = await chat.sendMessageStream(lastUser);
  for await (const chunk of stream.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}
