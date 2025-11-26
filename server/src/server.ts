import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import ttsRoutes from "./routes/ttsRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "AI Voice Studio API is running" });
});

// TTS Routes
app.use("/api/tts", ttsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
