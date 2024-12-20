const express = require('express');
const db = require("./db");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); 
const cors = require("cors");

const app = express();

// Allow cross-origin 
app.use(cors());

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

    // Store file metadata and path in PG db
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
    const uploadedFile = result.rows[0]; // Assuming "id" is the primary key
    const fileId = uploadedFile.id; // Extract the fileId (primary key) from the row

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        fileId, // Send the fileId back
        fileName: uploadedFile.original_name, // Send the file name
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, error: "Failed to upload file" });
  }
});

// Route to delete a PDF from both the uploads folder and the database
app.delete("/delete/:fileId", async (req, res) => {
    const { fileId } = req.params;
    try {
      // Query to get the file data (file path) from the database
      const queryText = "SELECT * FROM pdf_uploads WHERE id = $1";
      const result = await db.query(queryText, [fileId]);

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, error: "File not found" });
      }

      const fileData = result.rows[0];
      const filePath = path.join(__dirname, fileData.file_path); // Get file path

      // Step 1: Delete the file from the 'uploads' folder
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting the file:", err);
          return res
            .status(500)
            .json({
              success: false,
              error: "Failed to delete file from the server",
            });
        }

        // Step 2: Delete the entry from the database
        const deleteQuery = "DELETE FROM pdf_uploads WHERE id = $1";
        db.query(deleteQuery, [fileId])
          .then(() => {
            res
              .status(200)
              .json({ success: true, message: "File deleted successfully" });
          })
          .catch((dbError) => {
            console.error("Database error:", dbError);
            res
              .status(500)
              .json({
                success: false,
                error: "Failed to delete file from the database",
              });
          });
      });
    } catch (error) {
      console.error("Error during deletion:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to process file deletion" });
    }
});


// Serve uploaded files statically for preview or download
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});