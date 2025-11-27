import express from "express";
import {
  generateSpeechElevenLabs,
  getElevenLabsUserInfo,
  getElevenLabsVoices,
} from "../controllers/elevenlabsController";

const router = express.Router();

// ElevenLabs routes
router.post("/elevenlabs/generate", generateSpeechElevenLabs);
router.get("/elevenlabs/voices", getElevenLabsVoices);
router.get("/elevenlabs/user", getElevenLabsUserInfo);

export default router;
