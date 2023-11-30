const router = require("express").Router();
const moment = require("moment");
const pool = require("../dbPool");

// Retrieving filenames from database
router.post("/getUserFiles", async (req, res) => {
  const uid = req.body.uid;
  console.log(uid);

  // Define the SQL SELECT query to retrieve the filenames and timestamps by uid
  const selectQuery =
    "SELECT filename, timestamp FROM coderepo WHERE id = ? ORDER BY timestamp DESC";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("DB Connection Error: " + err);
      res.sendStatus(500);
      return;
    }

    connection.query(
      // Execute the query
      selectQuery,
      [uid], // Provide uid as param
      // Handle the result
      (error, results) => {
        if (error) {
          console.error("Error retrieving data: " + error.message);
          res.sendStatus(500);
        } else if (results.length > 0) {
          console.log(
            `Files fetched successfully \n ${JSON.stringify(results)}`
          );
          res.status(200).json(results);
        } else {
          res.sendStatus(202); // No matching documents found
        }
        connection.release(); // Release the connection back to the pool
      }
    );
  });
});

// Deleting file from database
router.post("/deleteUserFile", async (req, res) => {
  const uid = req.body.uid;
  const filename = req.body.filename;
  console.log(uid, filename);
  console.log("deleteUserFile called");

  // Define the SQL DELETE query to delete the file by uid and filename
  const deleteQuery = "DELETE FROM coderepo WHERE id = ? AND filename = ?";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("DB Connection Error: " + err);
      res.sendStatus(500);
      return;
    }

    connection.query(
      // Execute the query
      deleteQuery,
      [uid, filename], // Provide uid and filename as params
      // Handle the result
      (error, results) => {
        if (error) {
          console.error("Error deleting data: " + error.message);
          res.sendStatus(500);
        } else if (results.affectedRows > 0) {
          console.log(`File deleted successfully`);
          res.sendStatus(200);
        } else {
          res.sendStatus(404); // No matching documents found
        }
        connection.release(); // Release the connection back to the pool
      }
    );
  });
});

// Updating filename in database
router.post("/updateFilename", async (req, res) => {
  // Getting a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("DB Connection Error: " + err);
      res.sendStatus(500);
      return;
    }

    // Transaction
    try {
      const uid = req.body.uid;
      const filename = req.body.filename;
      const newFilename = req.body.newFilename;
      console.log(uid, filename, newFilename);

      // SQL update query to update filename
      const updateQuery =
        "UPDATE coderepo SET filename = ? WHERE id = ? AND filename = ?";

      connection.query(
        // Execute query
        updateQuery,
        // Provide params
        [newFilename, uid, filename],
        // Handle the result
        (error, results) => {
          if (error) {
            console.error("DB Error updating filename: " + error.message);
            res.sendStatus(503);
          } else {
            res.sendStatus(200);
            console.log("Filename updated successfully");
          }
          connection.release(); // Release the connection back to the pool
        }
      );
    } catch (error) {
      // Error handling
      console.error("Internal Server Error", error);
      res.sendStatus(500);
      connection.release(); // Release the connection in case of an error
    }
  });
});

// Saving code to database with UID
router.post("/savetoDB", async (req, res) => {
  // Getting a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("DB Connection Error: " + err);
      res.sendStatus(500);
      return;
    }

    // Create table if not exists
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS coderepo (
    \`id\` varchar(255) NOT NULL,
    \`data\` json DEFAULT NULL,
    \`timestamp\` varchar(45) DEFAULT NULL,
    \`filename\` varchar(45) NOT NULL,
    PRIMARY KEY (\`id\`,\`filename\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    `;

    connection.query(createTableQuery, (error, results) => {
      if (error) {
        console.error("DB Error creating table: " + error.message);
        res.sendStatus(503);
        connection.release();
        return;
      }
    });

    // Transaction
    try {
      const data = req.body.data;
      const uid = req.body.uid;
      const filename = req.body.filename;
      const timestamp = moment().format("HH:mm:ss YYYY-MM-DD");
      console.log(uid, data, timestamp, filename);

      // SQL insert query to insert new data or update existing data
      const insertQuery =
        "INSERT INTO coderepo (id, data, timestamp, filename) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data), timestamp = VALUES(timestamp)";

      connection.query(
        // Execute query
        insertQuery,
        // Provide params
        [uid, JSON.stringify({ data: data }), timestamp, filename],
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
      // Error handling
      console.error("Internal Server Error", error);
      res.sendStatus(500);
      connection.release(); // Release the connection in case of an error
    }
  });
});

// Retrieving code from database
router.post("/readfromDB", async (req, res) => {
  const uid = req.body.uid;
  const filename = req.body.filename;
  console.log(uid, filename);

  // Define the SQL SELECT query to retrieve the latest document by uid
  const selectQuery =
    "SELECT id, data, timestamp, filename FROM coderepo WHERE id = ? AND filename = ? ORDER BY timestamp DESC LIMIT 1";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("DB Connection Error: " + err);
      res.sendStatus(500);
      return;
    }

    connection.query(
      // Execute the query
      selectQuery,
      [uid, filename],
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
            filename: latestDoc.filename,
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

module.exports = router;
