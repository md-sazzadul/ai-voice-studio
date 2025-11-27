import express from "express";
import {
  generateSpeechElevenLabs,
  getElevenLabsUserInfo,
  getElevenLabsVoices,
} from "../controllers/elevenlabsController";
import {
  generateMockSpeech,
  getMockVoices,
} from "../controllers/mockTtsController";
import { generateSpeech, getVoices } from "../controllers/ttsController";

const router = express.Router();

// Smart endpoints that route based on TTS_MODE env variable
router.post("/generate-smart", (req, res) => {
  const mode = process.env.TTS_MODE || "mock";
  console.log(`Using TTS mode: ${mode}`);

  if (mode === "openai") {
    return generateSpeech(req, res);
  } else if (mode === "elevenlabs") {
    return generateSpeechElevenLabs(req, res);
  } else {
    return generateMockSpeech(req, res);
  }
});

router.get("/voices-smart", (req, res) => {
  const mode = process.env.TTS_MODE || "mock";

  if (mode === "openai") {
    return getVoices(req, res);
  } else if (mode === "elevenlabs") {
    return getElevenLabsVoices(req, res);
  } else {
    return getMockVoices(req, res);
  }
});

// Mock mode routes (for development)
router.post("/mock/generate", generateMockSpeech);
router.get("/mock/voices", getMockVoices);

// OpenAI routes
router.post("/generate", generateSpeech);
router.get("/voices", getVoices);

// ElevenLabs routes
router.post("/elevenlabs/generate", generateSpeechElevenLabs);
router.get("/elevenlabs/voices", getElevenLabsVoices);
router.get("/elevenlabs/user", getElevenLabsUserInfo);

export default router;
