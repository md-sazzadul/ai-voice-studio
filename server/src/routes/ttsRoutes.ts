import express from "express";
import { generateSpeech, getVoices } from "../controllers/ttsController";

const router = express.Router();

router.post("/generate", generateSpeech);
router.get("/voices", getVoices);

export default router;
