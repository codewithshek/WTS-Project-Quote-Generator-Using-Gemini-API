const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

// --- IMPORTANT ---
// Make sure this is your actual API key.
const GEMINI_API_KEY = "AIzaSyCITJ-4Vqxls3eMSf5RgxwosIZomqLliyk";
// Corrected the model name in the URL from gemini-pro to gemini-1.5-flash-latest
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

// Use middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const usedQuotes = new Set();

async function generateUniqueQuote(prompt, maxRetries = 10) {
  console.log(
    `\n--- Attempting to generate quote with prompt: "${prompt}" ---`
  );
  for (let i = 0; i < maxRetries; i++) {
    try {
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        // This is a critical log message
        console.error(
          `🔴 API Error Response [Status: ${response.status}]:`,
          errorBody
        );
        throw new Error(
          `Gemini API request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      // Log the full response from Google to see its structure
      console.log(
        "✅ Successfully received data from Gemini API:",
        JSON.stringify(data, null, 2)
      );

      const candidate = data.candidates?.[0];
      let generatedText = candidate?.content?.parts?.[0]?.text?.trim();

      if (generatedText) {
        generatedText = generatedText.replace(/^"|"$/g, "");

        if (!usedQuotes.has(generatedText)) {
          usedQuotes.add(generatedText);
          console.log(`✅ Unique quote found: "${generatedText}"`);
          return generatedText;
        }
        console.log("🟡 Duplicate quote generated, retrying...");
      } else {
        console.warn(
          "🟡 Received a response, but it contained no text. This might be due to a safety block."
        );
      }
    } catch (error) {
      console.error(
        "🔴 CRITICAL ERROR in generateUniqueQuote function:",
        error
      );
      break;
    }
  }
  throw new Error("Could not generate a unique quote after several attempts.");
}

app.get("/random-quote", async (req, res) => {
  console.log("\nReceived request for /random-quote");
  const prompt =
    "Generate a single, short, unique, and inspiring quote that is not commonly known.";
  try {
    const quote = await generateUniqueQuote(prompt);
    res.json({ quote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/emotion-quote", async (req, res) => {
  console.log("\nReceived request for /emotion-quote");
  const { emotion } = req.body;

  if (!emotion || typeof emotion !== "string" || emotion.trim().length === 0) {
    return res.status(400).json({ error: "Emotion is a required field." });
  }

  const sanitizedEmotion = emotion.trim().substring(0, 50);
  const prompt = `Generate a single, short, and unique quote that reflects the feeling of "${sanitizedEmotion}". The quote should be insightful and not a common phrase.`;

  try {
    const quote = await generateUniqueQuote(prompt);
    res.json({ quote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
