const express = require("express");
const path = require("path");
const db = require("./db"); 
const corsMiddleware = require("./middlewares/corsMiddleware");
const fileRoutes = require("./routes/filesRoutes");

const app = express();

// Apply CORS middleware globally
app.use(corsMiddleware);

// Middleware to parse JSON requests
app.use(express.json());

// Serve uploaded files statically for preview or download
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Basic endpoint
app.get("/", (req, res) => {
  res.send("<h1>Express server is serving</h1>");
});

// Routes
app.use("/files", fileRoutes); // You can now group all routes under a common "files" path

// Check database connection on startup
db.checkConnection();  // Make sure the DB is connected when server starts

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
