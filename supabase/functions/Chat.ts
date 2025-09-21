import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !OPENAI_API_KEY) {
  throw new Error("Missing required environment variables");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SYSTEM_PROMPT = `
You are ConfidAI — an empathetic, confidential mental wellness companion for youth.
Speak in a calm, validating, and non-judgmental tone. Always prioritize user safety.
- Validate feelings first: reflect back what the user said.
- Offer short coping strategies (breathing, grounding, journaling prompts, short guided exercises).
- Avoid any medical/diagnostic claims; do not offer medication or therapy instructions.
- If the user expresses self-harm, suicidal thoughts, or immediate danger, reply with immediate safety instructions, local crisis resources if available, and advise contacting emergency services or trusted people. Do not refuse to escalate.
- Keep answers concise and actionable; if appropriate offer to open a guided exercise or journal prompt.
- Respect privacy — never ask for identifying info unnecessarily.
`;

const app = express();
app.use(express.json());

// Simple in-memory rate limiter (per IP)
const RATE_LIMIT = 5; // max requests
const WINDOW_MS = 60 * 1000; // 1 minute
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count < RATE_LIMIT) {
    record.count += 1;
    return true;
  }
  return false;
}

// Crisis resources
function getCrisisResources(language: string) {
  const resources: Record<string, string> = {
    en: "If you are in immediate danger or thinking about self-harm, please dial your local emergency number or call a crisis helpline such as 988 in the U.S.",
    hi: "यदि आप तत्काल खतरे में हैं या आत्म-हानि के बारे में सोच रहे हैं, तो कृपया अपने स्थानीय आपातकालीन नंबर पर कॉल करें।",
  };
  return resources[language] ?? resources["en"];
}

app.post("/chat", async (req: Request, res: Response) => {
  try {
    const { user_id, message, language = "en" } = req.body;
    if (!user_id || !message) {
      return res.status(400).json({ error: "Missing user_id or message" });
    }

    // Rate limiting
    const ip = req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "unknown";
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: "Too many requests" });
    }

    // Store user message
    const { error: insertUserErr } = await supabase
      .from("chat_history")
      .insert([{ user_id, role: "user", message }]);
    if (insertUserErr) console.error("Supabase insert user error:", insertUserErr);

    // Call OpenAI
    const openaiResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!openaiResp.ok) {
      const errText = await openaiResp.text();
      console.error("OpenAI API error:", errText);
      return res.status(502).json({ error: "OpenAI API request failed" });
    }

    const openaiJson = await openaiResp.json();
    let reply = openaiJson.choices?.[0]?.message?.content ?? "I couldn't process that.";

    // Simple crisis detection
    if (/suicide|self[- ]?harm|kill myself|end my life/i.test(message)) {
      reply = getCrisisResources(language) + "\n\nYou are not alone. Please reach out to someone you trust.";
    }

    // Store assistant reply
    const { error: insertAssistantErr } = await supabase
      .from("chat_history")
      .insert([{ user_id, role: "assistant", message: reply, metadata: { language } }]);
    if (insertAssistantErr) console.error("Supabase insert assistant error:", insertAssistantErr);

    return res.status(200).json({ reply, metadata: { language } });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Chat service running on http://localhost:${PORT}`);
});
