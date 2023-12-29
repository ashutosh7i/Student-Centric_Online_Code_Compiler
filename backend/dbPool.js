const mysql = require("mysql2");
//
require("dotenv").config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth: true,
});

// check and create table if not exist
pool.query(
  // "CREATE TABLE IF NOT EXISTS coderepo (id VARCHAR(255) NOT NULL, filename VARCHAR(255) NOT NULL, timestamp VARCHAR(255) NOT NULL, code VARCHAR(255) NOT NULL, PRIMARY KEY (id, filename))",
  "CREATE TABLE IF NOT EXISTS coderepo (id varchar(255) NOT NULL, data json DEFAULT NULL, timestamp varchar(45) DEFAULT NULL, filename varchar(45) NOT NULL, PRIMARY KEY (id,filename)  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci",

  (err, res) => {
    if (err) throw err;
    console.log("Table created");
  }
);
module.exports = pool;
