import { Request, Response } from "express";
import { ELEVENLABS_VOICES, elevenlabsClient } from "../config/elevenlabs";

export const generateSpeechElevenLabs = async (req: Request, res: Response) => {
  try {
    const { text, voiceId = "EXAVITQu4vr4xnSDxMaL" } = req.body;

    // Validation
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ error: "Text is required and must be a string" });
    }

    if (text.length > 5000) {
      return res
        .status(400)
        .json({ error: "Text must be 5000 characters or less" });
    }

    console.log(
      `Generating speech with ElevenLabs for: "${text.substring(
        0,
        50
      )}..." with voice: ${voiceId}`
    );

    // Call ElevenLabs TTS API - usingturbo v2.5 model (free tier)
    const response = await elevenlabsClient.post(
      `/text-to-speech/${voiceId}`,
      {
        text,
        model_id: "eleven_turbo_v2_5", // Changed from eleven_monolingual_v1
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        responseType: "arraybuffer",
      }
    );

    const buffer = Buffer.from(response.data);

    // Set headers for audio response
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length,
      "Content-Disposition": 'attachment; filename="speech.mp3"',
    });

    res.send(buffer);
  } catch (error: any) {
    // Decode buffer if present
    let errorData = error.response?.data;
    if (Buffer.isBuffer(errorData)) {
      errorData = JSON.parse(errorData.toString());
    }

    console.error("ElevenLabs Error Details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: errorData,
      message: error.message,
    });
    res.status(error.response?.status || 500).json({
      error: "Failed to generate speech",
      details: errorData?.detail || errorData || error.message,
    });
  }
};

export const getElevenLabsVoices = (req: Request, res: Response) => {
  res.json({ voices: ELEVENLABS_VOICES });
};

export const getElevenLabsUserInfo = async (req: Request, res: Response) => {
  try {
    console.log("Attempting to fetch ElevenLabs user info...");
    const response = await elevenlabsClient.get("/user");
    console.log("User info fetched successfully");
    res.json(response.data);
  } catch (error: any) {
    console.error("ElevenLabs User Info Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    res.status(500).json({
      error: "Failed to fetch user info",
      details: error.response?.data || error.message,
    });
  }
};
