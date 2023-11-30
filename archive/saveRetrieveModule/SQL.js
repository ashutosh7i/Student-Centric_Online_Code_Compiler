const express = require("express");
const app = express();
const mysql = require("mysql");
const moment = require("moment");
const path = require("path");

app.use(express.json());

//Here we are using a DB Pool based architecture
//read here- https://www.cockroachlabs.com/blog/what-is-connection-pooling/

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3700,
  user: "root",
  password: "1234567890Db",
  database: "socdb",
  insecureAuth: true,
});

// Saving data to MySQL
app.post("/savetoDB", async (req, res) => {
  //getting a connection from pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("DB Connection Error: " + err);
      res.sendStatus(500);
      return;
    }

    //transaction
    try {
      const data = req.body.data;
      const uid = req.body.uid;
      const timestamp = moment().format("HH:mm:ss YYYY-MM-DD");
      console.log(uid, data, timestamp);

      // SQL insert query to insert new data or update existing data
      const insertQuery =
        "INSERT INTO saveretrievemodule (id, data, timestamp) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data), timestamp = VALUES(timestamp)";

      connection.query(
        // Execute query
        insertQuery,
        // Provide params
        [uid, JSON.stringify({ data: data }), timestamp],
        // Handle the result
        (error, results) => {
          if (error) {
            console.error("DB Error saving or updating data: " + error.message);
            res.sendStatus(503);
          } else {
            res.sendStatus(200);
            console.log("Data saved successfully or updated");
          }
          connection.release(); // Release the connection back to the pool
        }
      );
    } catch (error) {
      //error Handling
      console.error("Internal Server Error", error);
      res.sendStatus(500);
      connection.release(); // Release the connection in case of an error
    }
  });
});

// Retrieving data from MySQL
app.post("/readfromDB", async (req, res) => {
  const uid = req.body.uid;
  console.log(uid);

  // Define the SQL SELECT query to retrieve the latest document by uid
  const selectQuery =
    "SELECT id, data, timestamp FROM saveretrievemodule WHERE id = ? ORDER BY timestamp DESC LIMIT 1";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("DB Connection Error: " + err);
      res.sendStatus(500);
      return;
    }

    connection.query(
      // Execute the query
      selectQuery,
      [uid],
      // Handle the result
      (error, results) => {
        if (error) {
          console.error("Error retrieving data: " + error.message);
          res.sendStatus(500);
        } else if (results.length > 0) {
          const latestDoc = results[0];
          const fetchedData = {
            uid: latestDoc.id,
            data: latestDoc.data,
            timestamp: latestDoc.timestamp,
          };
          console.log(
            `Data fetched successfully \n ${JSON.stringify(fetchedData)}`
          );
          res.status(200).json(fetchedData);
        } else {
          res.sendStatus(404); // No matching documents found
        }
        connection.release(); // Release the connection back to the pool
      }
    );
  });
});

//serving frontend from same server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
