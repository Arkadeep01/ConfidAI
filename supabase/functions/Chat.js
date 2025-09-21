import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";

// Use environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;

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

serve(async (req) => {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

    const { user_id, message, language } = await req.json();
    if (!user_id || !message) return new Response(JSON.stringify({ error: "Missing user_id or message" }), { status: 400 });

    // Insert user message
    await supabase.from("chat_history").insert([{ user_id, role: "user", message }]);

    // Call OpenAI
    const openaiResp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: message }],
            max_tokens: 500,
            temperature: 0.7,
        }),
    });

    const openaiJson = await openaiResp.json();
    const reply = openaiJson.choices?.[0]?.message?.content ?? "I couldn't process that.";

    // Insert assistant reply
    await supabase.from("chat_history").insert([{ user_id, role: "assistant", message: reply, metadata: { language: language ?? "en" } }]);

    return new Response(JSON.stringify({ reply, metadata: { language: language ?? "en" } }), { status: 200, headers: { "Content-Type": "application/json" } });
});
