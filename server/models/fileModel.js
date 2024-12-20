const db = require("../db");

module.exports.insertFile = async (
  originalName,
  filePath,
  mimeType,
  fileSize
) => {
  const queryText = `
    INSERT INTO pdf_uploads (original_name, file_path, mime_type, file_size)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const queryValues = [originalName, filePath, mimeType, fileSize];
  const result = await db.query(queryText, queryValues);
  return result.rows[0];
};
