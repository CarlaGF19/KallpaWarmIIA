'use server';
/**
 * @fileOverview A server-only module for interacting with the Poe API.
 * 
 * - poeClient - An OpenAI client instance configured for the Poe API.
 * - askKallpaWarmIA - A function to get a response from the KallpaWarmIA model.
 */

import "server-only";
import { OpenAI } from "openai";
import type { ChatMessage } from '../schemas/chat-schemas';

const poeClient = new OpenAI({
  apiKey: process.env.POE_API_KEY,
  baseURL: "https://api.poe.com/v1",
});

export async function askKallpaWarmIA(messages: ChatMessage[], temperature = 0.7) {
  const apiKey = process.env.POE_API_KEY;

  if (!apiKey) {
    throw new Error("La clave de la API de Poe no está presente en el entorno. Por favor, define POE_API_KEY.");
  }
  
  const completion = await poeClient.chat.completions.create({
    model: "KallpaWarmIA",
    messages: messages,
    temperature: temperature,
    top_p: 1,
  });

  return completion.choices[0]?.message?.content ?? "";
}
