const express = require("express");
const cors = require("cors");
const app = express();
const port = 5050;
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Zithara",
  password: "Meghana@1362",
  port: 5432,
});

app.use(express.json());
app.use(cors());

// Fetch paginated, sorted, and searched data
// app.get("/api/customers", async (req, res) => {
//   console.log("Request received at /api/customers");
//   try {
//     const {
//       page = 1,
//       pageSize = 50,
//       sortBy = "created_at",
//       sortOrder = "DESC",
//       search = "",
//     } = req.query;
//     const offset = (page - 1) * pageSize;
//     const queryString = `
//       SELECT sno, customer_name, age, phone, location, created_at::date AS date, created_at::time AS time
//       FROM customers
//       WHERE customer_name ILIKE $1 OR location ILIKE $1
//       ORDER BY ${sortBy} ${sortOrder}
//       LIMIT $2 OFFSET $3
//     `;
//     const result = await pool.query(queryString, [
//       `%${search}%`,
//       pageSize,
//       offset,
//     ]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


app.get("/api/customers", async (req, res) => {
    console.log("Request received at /api/customers");
    try {
      const {
        page = 1,
        pageSize = 50,
        sortBy = "date",
        sortOrder = "ASC",
        search = ""
      } = req.query;
      const offset = (page - 1) * pageSize;
      const queryString = `
        SELECT sno, customer_name, age, phone, location, created_at::date AS date, created_at::time AS time
        FROM customers
        WHERE customer_name ILIKE $1 OR location ILIKE $1
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT $2 OFFSET $3
      `;
      const result = await pool.query(queryString, [`%${search}%`, pageSize, offset]);
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
