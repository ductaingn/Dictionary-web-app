import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { posts } from "./database/blog/pages.js";

const app = express();
const protocol = process.env.PROTOCOL || "http";
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3001;

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS + serve frontend
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

// Load the DB
const idioms_db = new Database(path.join(__dirname, "database/idioms.db"));

const categories_db = new Database(
  path.join(__dirname, "database/categories.db")
);

// API route
// Idioms
app.get("/api/idioms/:name", (req, res) => {
  const name = req.params.name;

  try {
    const row = idioms_db
      .prepare(
        "SELECT * FROM idioms WHERE thanh_ngu_tieng_trung = ? COLLATE NOCASE"
      )
      .get(name);

    if (row) {
      res.json(row);
    } else {
      res.json({
        thanh_ngu_tieng_trung: name,
        found: false,
        message: "Idiom not found in database.",
        nghia: "",
        phien_am: "",
        am_han_viet: "",
      });
    }
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Sugestions on type for idioms
app.get("/api/idioms/suggestions/:name", (req, res) => {
  const name = req.params.name;
  try {
    const rows = idioms_db
      .prepare(
        "SELECT thanh_ngu_tieng_trung FROM idioms WHERE thanh_ngu_tieng_trung LIKE ? COLLATE NOCASE LIMIT 10"
      )
      .all(`${name}%`);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: "No suggestions found" });
    }
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Idiom categories with idioms inside
app.get("/api/categories", (req, res) => {
  try {
    const rows = categories_db.prepare("SELECT * FROM categories").all();
    res.json(rows);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/categories/:category", (req, res) => {
  const category = req.params.category;
  try {
    const rows = categories_db
      .prepare(
        "SELECT idioms FROM categories WHERE category = ? COLLATE NOCASE"
      )
      .all(category);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/categories/:category/:subCategory", (req, res) => {
  const { category, subCategory } = req.params;

  try {
    const rows = categories_db
      .prepare(
        "SELECT idioms FROM categories WHERE category = ? COLLATE NOCASE AND sub_category = ? COLLATE NOCASE"
      )
      .all(category, subCategory);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: "Subcategory not found" });
    }
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
app.get(
  "/api/categories/:category/:subCategory/:subSubCategory",
  (req, res) => {
    const { category, subCategory, subSubCategory } = req.params;
    try {
      const rows = categories_db
        .prepare(
          "SELECT idioms FROM categories WHERE category = ? COLLATE NOCASE AND sub_category = ? COLLATE NOCASE AND sub_sub_category = ? COLLATE NOCASE"
        )
        .all(category, subCategory, subSubCategory);

      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).json({ error: "Sub-subcategory not found" });
      }
    } catch (err) {
      console.error("DB error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
);

// Blog posts
app.get("/api/blog/posts", (req, res) => {
  try {
    res.json(posts);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((p) => p.id === id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at ${protocol}://${host}:${port}`);
});
