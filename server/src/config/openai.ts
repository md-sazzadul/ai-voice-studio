import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Available voices in OpenAI TTS
export const AVAILABLE_VOICES = [
  "alloy",
  "echo",
  "fable",
  "onyx",
  "nova",
  "shimmer",
] as const;
export type VoiceType = (typeof AVAILABLE_VOICES)[number];

// Available models
export const TTS_MODELS = ["tts-1", "tts-1-hd"] as const;
export type TTSModel = (typeof TTS_MODELS)[number];
