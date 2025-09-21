// server.js
import express from "express";

const app = express();
app.use(express.json()); // to parse JSON body

app.post("/analyze-mood", (req, res) => {
  try {
    const { mood } = req.body;

    let sentiment = "neutral";
    if (["happy", "excited"].includes(mood)) sentiment = "positive";
    else if (["sad", "angry"].includes(mood)) sentiment = "negative";

    res.json({ mood, sentiment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
