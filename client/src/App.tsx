import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("nova");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Please enter some text");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/tts/generate-smart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            voice: selectedVoice,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate speech");
      }

      // Convert response to blob and create URL
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ AI Voice Studio</h1>
        <p>Convert text to speech with AI-powered voices</p>
      </header>

      <main className="container">
        <div className="input-section">
          <label htmlFor="text-input">Enter Your Text</label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            rows={6}
            maxLength={5000}
          />
          <div className="char-count">{text.length} / 5000 characters</div>
        </div>

        <div className="voice-section">
          <label htmlFor="voice-select">Select Voice</label>
          <select
            id="voice-select"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            <option value="alloy">Alloy - Neutral and balanced</option>
            <option value="echo">Echo - Male, clear</option>
            <option value="fable">Fable - British accent</option>
            <option value="onyx">Onyx - Deep male</option>
            <option value="nova">Nova - Warm female</option>
            <option value="shimmer">Shimmer - Soft female</option>
          </select>
        </div>

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? "Generating..." : "🎤 Generate Speech"}
        </button>

        {error && <div className="error-message">⚠️ {error}</div>}

        {audioUrl && (
          <div className="audio-section">
            <h3>Generated Audio</h3>
            <audio controls src={audioUrl} className="audio-player">
              Your browser does not support the audio element.
            </audio>
            <a href={audioUrl} download="speech.mp3" className="download-btn">
              ⬇️ Download MP3
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
