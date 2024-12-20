const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// Manage connections to the database
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function checkConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("Connected to the database successfully");
  } catch (err) {
    console.error("Failed to connect to database:", err);
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  checkConnection,
};