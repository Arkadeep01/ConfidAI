// notifications.js
import express from "express";

const app = express();

app.get("/notifications", (_req, res) => {
  // Example: mock notification
  const notifications = [
    { id: 1, message: "Time to write your journal!" },
    { id: 2, message: "Try a 5-min meditation session." },
  ];

  res.json(notifications);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
