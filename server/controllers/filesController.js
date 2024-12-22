const fs = require("fs");
const path = require("path");
const db = require("../db");
const { PDFDocument } = require("pdf-lib");

module.exports.deleteProcessedFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const queryText = "SELECT * FROM pdf_files WHERE id = $1";
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

      const deleteQuery = "DELETE FROM pdf_files WHERE id = $1";
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


module.exports.getProcessedPdf = async (req, res) => {
  const { fileId } = req.params;

  try {
    // Query the database for the processed PDF
    const queryText = "SELECT file_path FROM pdf_files WHERE id = $1";
    const result = await db.query(queryText, [fileId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "File not found" });
    }

    const filePath = result.rows[0].file_path;

    // Check if the file exists on the server
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res
          .status(404)
          .json({ success: false, error: "File not found on server" });
      }

      // Set headers for serving the PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename=\"processed-${fileId}.pdf\"`
      );

      // Stream the PDF to the response
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (error) {
    console.error("Error fetching processed PDF:", error);
    res.status(500).json({ success: false, error: "Failed to fetch file" });
  }
};


module.exports.processPdf = async (req, res) => {
  const { fileId, position = "center", orientation = "landscape" } = req.query; // Default position is "center", orientation is "landscape"

  try {
    if (!fileId) {
      return res.status(400).json({ error: "fileId is required." });
    }

    // Query database for file path
    const { rows } = await db.query(
      "SELECT file_path FROM pdf_uploads WHERE id = $1",
      [fileId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "PDF not found." });
    }

    const filePath = rows[0].file_path;
    const originalPdfBytes = fs.readFileSync(filePath);

    // Load the uploaded PDF
    const originalPdf = await PDFDocument.load(originalPdfBytes);

    // Create a new PDF document
    const newPdf = await PDFDocument.create();

    // Define page size
    const { width, height } =
      orientation === "landscape"
        ? { width: 842, height: 595 } // A4 Landscape
        : { width: 595, height: 842 }; // A4 Portrait

    // Loop through the pages of the original PDF
    const originalPages = originalPdf.getPages();
    for (const page of originalPages) {
      // Get the original dimensions of the page
      const originalWidth = page.getWidth();
      const originalHeight = page.getHeight();

      // Scale dimensions to half
      const scaledWidth = originalWidth / 2;
      const scaledHeight = originalHeight / 2;

      // Calculate X position based on the "position" key
      let x;
      if (position === "left") {
        x = 0; // Align to the left, but ensure the PDF fits completely
      } else if (position === "right") {
        x = width - scaledWidth; // Align to the right
      } else {
        // Default to "center"
        x = (width - scaledWidth) / 2;
      }

      // Calculate the vertical position (center vertically)
      const y = (height - scaledHeight) / 2;

      // Add a blank page to the new PDF with the desired orientation
      const newPage = newPdf.addPage([width, height]);

      // Embed the original page and draw it on the new page
      const [embeddedPage] = await newPdf.embedPages([page]);
      newPage.drawPage(embeddedPage, {
        x,
        y,
        width: scaledWidth,
        height: scaledHeight,
      });
    }

    // Path to the 'processed' directory inside the 'server' folder
    const processedDir = path.join("processed");
    if (!fs.existsSync(processedDir)) {
      fs.mkdirSync(processedDir);
    }

    // Save the new PDF
    const newPdfPath = path.join(processedDir, `processed-${Date.now()}.pdf`);
    fs.writeFileSync(newPdfPath, await newPdf.save());

    // Insert new file into the database
    const result = await db.query(
      "INSERT INTO pdf_files (file_path, created_at) VALUES ($1, NOW()) RETURNING id",
      [newPdfPath]
    );

    const newFileId = result.rows[0].id;

    // Respond with the new file ID
    res.status(200).json({ fileId: newFileId });
  } catch (error) {
    console.error("Error processing the PDF:", error);
    res.status(500).json({ error: "Failed to process the PDF." });
  }
};


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
