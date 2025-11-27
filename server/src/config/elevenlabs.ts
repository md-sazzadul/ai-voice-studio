import axios from "axios";

if (!process.env.ELEVENLABS_API_KEY) {
  throw new Error("ELEVENLABS_API_KEY is not set in environment variables");
}

export const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
export const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

// Pre-made voices available in ElevenLabs (free tier)
export const ELEVENLABS_VOICES = [
  {
    id: "pNInz6obpgDQGcFmaJgB",
    name: "Adam",
    description: "Deep, resonant male voice",
  },
  {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Sarah",
    description: "Soft, warm female voice",
  },
  {
    id: "VR6AewLTigWG4xSOukaG",
    name: "Nicole",
    description: "Calm, professional female voice",
  },
  {
    id: "pFZP5JQG7iQjIQuC4Bku",
    name: "Lily",
    description: "Young, energetic female voice",
  },
  {
    id: "TX3LPaxmHKxFdv7VOQHJ",
    name: "Rachel",
    description: "Clear, articulate female voice",
  },
  {
    id: "onwK4e9ZLuTAKqWW03F9",
    name: "Daniel",
    description: "Professional, authoritative male voice",
  },
] as const;

export const elevenlabsClient = axios.create({
  baseURL: ELEVENLABS_API_URL,
  headers: {
    "xi-api-key": ELEVENLABS_API_KEY,
    "Content-Type": "application/json",
  },
});
