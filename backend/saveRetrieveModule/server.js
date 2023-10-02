const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const moment = require("moment");
const path = require("path");

const mongoUri =
  "mongodb+srv://ashutosh7i:tempPassword001@testcluster.sa3qcgj.mongodb.net/testDB";
// yes i know credentials are exposed, but Mongo will only accept connections from my IP only(that too is dynamic😂)

const client = new MongoClient(mongoUri);
if (client.connect()) {
  console.log("mongodb connected");
}

app.use(express.json());

// Saving data to MongoDB
app.post("/savetoDB", async (req, res) => {
  try {
    const data = req.body.data;
    const uid = req.body.uid;
    const timestamp = moment().format("HH:mm:ss YYYY-MM-DD");
    console.log(uid, data, timestamp);

    await client.connect();
    const database = client.db("testDB");
    const collection = database.collection(`${uid}`);

    //approach in which it creates new document for every new entry
    //   const result = await collection.insertOne({
    //     uid,
    //     data,
    //     timestamp,
    //   });
    //   if (result) {
    //     res.sendStatus(200);
    //     console.log("data saved successfully");
    //   } else {
    //     console.error("Error saving data:", error);
    //     res.sendStatus(500);
    //   }
    // } catch (error) {
    //   console.error("Error saving data:", error);
    //   res.sendStatus(500);
    // } finally {
    //   await client.close();
    // }

    //New Approach that over writes that single doucment or create if not exists

    // Define the update operation, here we are updating the 'data' and 'timestamp' fields
    const updateDoc = {
      $set: {
        data: data,
        timestamp: timestamp,
      },
    };
    // Use updateOne to update the existing document or create it if it doesn't exist
    const result = await collection.updateOne({ uid: uid }, updateDoc, {
      upsert: true,
    });

    if (result.modifiedCount === 1 || result.upsertedCount === 1) {
      res.sendStatus(200);
      console.log("Data saved successfully or updated");
    } else {
      console.error("Error saving or updating data");
      res.sendStatus(500);
    }
  } catch (error) {
    console.error("Error saving or updating data:", error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

// Retrieving data from MongoDB
app.post("/readfromDB", async (req, res) => {
  try {
    const uid = req.body.uid;
    console.log(uid);

    await client.connect();
    const database = client.db("testDB");
    const collection = database.collection(`${uid}`);

    // Use aggregation to find and sort documents by timestamp
    const pipeline = [
      {
        $match: {
          uid: uid,
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
      {
        $limit: 1,
      },
    ];

    const query = await collection.aggregate(pipeline).toArray();

    if (query.length > 0) {
      const latestDoc = query[0];
      const fetchedData = {
        uid: latestDoc.uid,
        data: latestDoc.data,
        timestamp: latestDoc.timestamp,
      };
      console.log(
        `data fetched successfully \n ${JSON.stringify(fetchedData)}`
      );
      res.status(200).json(fetchedData);
    } else {
      res.sendStatus(404); // No matching documents found
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

//serving frontend from same server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
