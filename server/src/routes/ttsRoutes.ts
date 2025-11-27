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
