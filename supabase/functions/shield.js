// shieldMode.js
import express from "express";

const app = express();

app.get("/shield", (req, res) => {
  // Example: return if shield mode is ON/OFF
  const shieldMode = { enabled: false };

  res.json(shieldMode);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🛡️ Shield mode service running at http://localhost:${PORT}`);
});
