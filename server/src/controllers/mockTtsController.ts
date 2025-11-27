import { Request, Response } from "express";

// Simple function to generate a mock audio file (silent MP3)
const generateMockAudio = (text: string, voice: string): Buffer => {
  // This is a minimal valid MP3 file (silent, ~1 second)
  // In reality, this would be actual TTS audio
  const mockMp3Header = Buffer.from([
    0xff, 0xfb, 0x90, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
  ]);

  // Repeat to make it longer (simulate ~2-3 seconds of audio)
  const frames = 50;
  const buffers = Array(frames).fill(mockMp3Header);

  return Buffer.concat(buffers);
};

export const generateMockSpeech = async (req: Request, res: Response) => {
  try {
    const { text, voice = "alloy", voiceId } = req.body;

    // Validation
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ error: "Text is required and must be a string" });
    }

    console.log(
      `[MOCK MODE] Generating speech for: "${text.substring(
        0,
        50
      )}..." with voice: ${voice || voiceId}`
    );

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate mock audio
    const buffer = generateMockAudio(text, voice || voiceId);

    // Set headers for audio response
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length,
      "Content-Disposition": 'attachment; filename="speech.mp3"',
      "X-Mock-Mode": "true", // Header to indicate this is mock data
    });

    res.send(buffer);
  } catch (error: any) {
    console.error("Error in mock speech generation:", error);
    res.status(500).json({
      error: "Failed to generate speech",
      details: error.message,
    });
  }
};

export const getMockVoices = (req: Request, res: Response) => {
  const voices = [
    { id: "alloy", name: "Alloy", description: "Neutral and balanced" },
    { id: "echo", name: "Echo", description: "Male, clear and articulate" },
    { id: "fable", name: "Fable", description: "British accent, expressive" },
    { id: "onyx", name: "Onyx", description: "Deep male voice" },
    { id: "nova", name: "Nova", description: "Female, warm and friendly" },
    { id: "shimmer", name: "Shimmer", description: "Female, soft and gentle" },
    {
      id: "sarah",
      name: "Sarah (ElevenLabs)",
      description: "Soft, warm female voice",
    },
    {
      id: "adam",
      name: "Adam (ElevenLabs)",
      description: "Deep, resonant male voice",
    },
  ];

  res.json({ voices, mockMode: true });
};
