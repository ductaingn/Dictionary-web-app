// ✅ Correct way to import better-sqlite3 in ES modules
import Database from "better-sqlite3";

// 🔧 Open the SQLite DB
const db = new Database("src/database/categories.db");

// 🧪 Test query (change as needed)
const stmt = db.prepare("SELECT * FROM categories");
const rows = stmt.all();

console.log(rows);
