const express = require('express');
const db = require("./db");
const multer = require("multer");
const path = require("path");

const app = express();

// Check database connection on startup
db.checkConnection();

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/", // Files are stored in the 'uploads' directory
});

app.use(express.json());

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

// Route to upload a PDF
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const { originalname, filename, mimetype, size } = req.file;

    // TODO: only allow pdf
      
    // Store file metadata and path in PostgreSQL
    const queryText = `
      INSERT INTO pdf_uploads (original_name, file_path, mime_type, file_size)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const queryValues = [
      originalname,
      path.join("uploads", filename),
      mimetype,
      size,
    ];

    const result = await db.query(queryText, queryValues);

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, error: "Failed to upload file" });
  }
});

// Serve uploaded files statically for preview or download
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});