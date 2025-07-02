import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3001;

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS + serve frontend
app.use(cors());
app.use(express.static(path.join(__dirname, "../../client/dist")));

// Load the DB
const idioms_db = new Database(path.join(__dirname, "database/idioms.db"));

const categories_db = new Database(
  path.join(__dirname, "database/categories.db")
);

// API route
app.get("/api/categories", (req, res) => {
  try {
    const rows = categories_db.prepare("SELECT * FROM categories").all();
    res.json(rows);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
