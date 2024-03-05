const router = require("express").Router();
const moment = require("moment");
const pool = require("../dbPool");

// Retrieving filenames from database
router.post("/getUserFiles", async (req, res) => {
  try {
    const uid = req.body.uid;
    console.log(uid);

    // Define the SQL SELECT query to retrieve the filenames and timestamps by uid
    const selectQuery =
      "SELECT filename, timestamp FROM coderepo WHERE id = $1 ORDER BY timestamp DESC";

    const client = await pool.connect();
    try {
      const { rows } = await client.query(selectQuery, [uid]);

      if (rows.length > 0) {
        console.log(`Files fetched successfully \n ${JSON.stringify(rows)}`);
        res.status(200).json(rows);
      } else {
        res.sendStatus(202); // No matching documents found
      }
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Error retrieving data: " + error.message);
    res.sendStatus(500);
  }
});

// Deleting file from database
router.post("/deleteUserFile", async (req, res) => {
  try {
    const uid = req.body.uid;
    const filename = req.body.filename;
    console.log(uid, filename);
    console.log("deleteUserFile called");

    // Define the SQL DELETE query to delete the file by uid and filename
    const deleteQuery = "DELETE FROM coderepo WHERE id = $1 AND filename = $2";

    const client = await pool.connect();
    try {
      const result = await client.query(deleteQuery, [uid, filename]);

      if (result.rowCount > 0) {
        console.log(`File deleted successfully`);
        res.sendStatus(200);
      } else {
        res.sendStatus(404); // No matching documents found
      }
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Error deleting data: " + error.message);
    res.sendStatus(500);
  }
});

// Updating filename in database
router.post("/updateFilename", async (req, res) => {
  try {
    const uid = req.body.uid;
    const filename = req.body.filename;
    const newFilename = req.body.newFilename;
    console.log(uid, filename, newFilename);

    // SQL update query to update filename
    const updateQuery =
      "UPDATE coderepo SET filename = $1 WHERE id = $2 AND filename = $3";

    const client = await pool.connect();
    try {
      const result = await client.query(updateQuery, [
        newFilename,
        uid,
        filename,
      ]);

      if (result.rowCount > 0) {
        res.sendStatus(200);
        console.log("Filename updated successfully");
      } else {
        res.sendStatus(404); // No matching documents found
      }
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Error updating filename: " + error.message);
    res.sendStatus(503);
  }
});

// Saving code to database with UID
router.post("/savetoDB", async (req, res) => {
  try {
    const data = req.body.data;
    const uid = req.body.uid;
    const filename = req.body.filename;
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(uid, data, timestamp, filename);

    // SQL insert query to insert new data or update existing data
    const insertQuery =
      "INSERT INTO coderepo (id, data, timestamp, filename) VALUES ($1, $2, $3, $4) ON CONFLICT (id, filename) DO UPDATE SET data = EXCLUDED.data, timestamp = EXCLUDED.timestamp";

    const client = await pool.connect();
    try {
      await client.query("BEGIN"); // Start transaction

      await client.query(insertQuery, [
        uid,
        JSON.stringify({ data }),
        timestamp,
        filename,
      ]);

      await client.query("COMMIT"); // Commit transaction
      res.sendStatus(200);
      console.log("Data saved successfully or updated");
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback transaction
      console.error("DB Error saving or updating data: " + error.message);
      res.sendStatus(503);
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    // Error handling
    console.error("Internal Server Error", error);
    res.sendStatus(500);
  }
});

// Retrieving code from database
router.post("/readfromDB", async (req, res) => {
  try {
    const uid = req.body.uid;
    const filename = req.body.filename;
    console.log(uid, filename);

    // Define the SQL SELECT query to retrieve the latest document by uid
    const selectQuery =
      "SELECT id, data, timestamp, filename FROM coderepo WHERE id = $1 AND filename = $2 ORDER BY timestamp DESC LIMIT 1";

    const client = await pool.connect();
    try {
      const { rows } = await client.query(selectQuery, [uid, filename]);

      if (rows.length > 0) {
        const latestDoc = rows[0];
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
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Error retrieving data: " + error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
