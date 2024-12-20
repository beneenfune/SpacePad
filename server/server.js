const express = require('express');
const db = require("./db");
const app = express();

// Check database connection on startup
db.checkConnection();

// Basic endpoint to confirm server is running
app.get('/', (req, res) => {
    res.send('<h1>Hello, express server!</h1>');
});

// Endpoint to check database connection status
app.get("/db-status", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "success", message: "Database connected successfully." });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Database connection failed.", error: err.message });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});