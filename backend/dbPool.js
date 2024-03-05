const { Pool } = require("pg");
//
require("dotenv").config();

// Create a MySQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// check and create table if not exist
pool.query(
  "CREATE TABLE IF NOT EXISTS coderepo (id VARCHAR(255) NOT NULL,data JSONB DEFAULT NULL,timestamp TIMESTAMP DEFAULT NULL,filename VARCHAR(45) NOT NULL,PRIMARY KEY (id, filename))",

  (err, res) => {
    if (err) throw err;
    console.log("Table created");
  }
);
module.exports = pool;
