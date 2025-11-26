import { Request, Response } from "express";
import type { TTSModel, VoiceType } from "../config/openai";
import { openai } from "../config/openai";

export const generateSpeech = async (req: Request, res: Response) => {
  try {
    const { text, voice = "alloy", model = "tts-1" } = req.body;

    // Validation
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ error: "Text is required and must be a string" });
    }

    if (text.length > 4096) {
      return res
        .status(400)
        .json({ error: "Text must be 4096 characters or less" });
    }

    console.log(
      `Generating speech for text: "${text.substring(
        0,
        50
      )}..." with voice: ${voice}`
    );

    // Call OpenAI TTS API
    const mp3 = await openai.audio.speech.create({
      model: model as TTSModel,
      voice: voice as VoiceType,
      input: text,
      response_format: "mp3",
    });

    // Convert response to buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Set headers for audio response
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length,
      "Content-Disposition": 'attachment; filename="speech.mp3"',
    });

    res.send(buffer);
  } catch (error: any) {
    console.error("Error generating speech:", error);
    res.status(500).json({
      error: "Failed to generate speech",
      details: error.message,
    });
  }
};

export const getVoices = (req: Request, res: Response) => {
  const voices = [
    { id: "alloy", name: "Alloy", description: "Neutral and balanced" },
    { id: "echo", name: "Echo", description: "Male, clear and articulate" },
    { id: "fable", name: "Fable", description: "British accent, expressive" },
    { id: "onyx", name: "Onyx", description: "Deep male voice" },
    { id: "nova", name: "Nova", description: "Female, warm and friendly" },
    { id: "shimmer", name: "Shimmer", description: "Female, soft and gentle" },
  ];

  res.json({ voices });
};
