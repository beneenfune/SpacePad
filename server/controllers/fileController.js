const fs = require("fs");
const path = require("path");
const db = require("../db");

module.exports.getPdf = async (req, res) => {
  const { fileId } = req.params;

  try {
    // Check the database for the file's information
    const queryText = "SELECT * FROM pdf_uploads WHERE id = $1";
    const result = await db.query(queryText, [fileId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "File not found" });
    }

    const fileData = result.rows[0];
    const filePath = path.join(__dirname, "..", fileData.file_path);

    // Check if the file exists on the server
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res
          .status(404)
          .json({ success: false, error: "File not found on server" });
      }

      // Set the correct Content-Type header and serve the file
      res.setHeader("Content-Type", fileData.mime_type);
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${fileData.original_name}"`
      );
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ success: false, error: "Failed to fetch file" });
  }
};


module.exports.uploadFile = async (req, res) => {
  try {
    // Check if the file is uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded" });
    }

    const { originalname, filename, mimetype, size } = req.file;

    // Add the file's information to your database
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
    const uploadedFile = result.rows[0];

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        fileId: uploadedFile.id,
        fileName: uploadedFile.original_name,
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, error: "Failed to upload file" });
  }
};


module.exports.deleteFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const queryText = "SELECT * FROM pdf_uploads WHERE id = $1";
    const result = await db.query(queryText, [fileId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "File not found" });
    }

    const fileData = result.rows[0];
    const filePath = path.join(__dirname, "..", fileData.file_path);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
        return res.status(500).json({
          success: false,
          error: "Failed to delete file from the server",
        });
      }

      const deleteQuery = "DELETE FROM pdf_uploads WHERE id = $1";
      db.query(deleteQuery, [fileId])
        .then(() => {
          res
            .status(200)
            .json({ success: true, message: "File deleted successfully" });
        })
        .catch((dbError) => {
          console.error("Database error:", dbError);
          res.status(500).json({
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
};
