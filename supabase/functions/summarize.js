// summary.js
import express from "express";

const app = express();
app.use(express.json()); // so we can parse JSON body

app.post("/summarize", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  // Example AI processing (mock)
  const summary = content.slice(0, 100) + "...";

  res.json({ summary });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
