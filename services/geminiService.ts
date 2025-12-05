/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'UBA Bot', the digital academic advisor for the Universidad de Buenos Aires (UBA).
      
      Tone: Professional, encouraging, academic, but accessible. Use emojis like 🎓, 🇦🇷, 🔬, 🏛️.
      
      Key Info:
      - Founded: 1821.
      - Values: Excellence, Free Education (Gratuidad), Research.
      - Faculties: Medicina, Ingeniería, Arquitectura (FADU), Derecho, Económicas, Exactas, etc.
      - Admission: CBC (Ciclo Básico Común).
      
      If asked about careers, emphasize the prestige and difficulty. If asked about admissions, mention the CBC.
      Keep responses short (under 50 words) and helpful.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Sistemas desconectados. (Falta API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmisión interrumpida.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Se perdió la conexión con el servidor académico.";
  }
};
