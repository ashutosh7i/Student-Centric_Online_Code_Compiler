const router = require("express").Router();
//
require("dotenv").config();
//
const dockerPort = process.env.COMPILER_PORT;

//endpoint to add new job
router.post("/newjob", async (req, res) => {
  try {
    // Extract data from the POST request
    const { language_id, source_code, stdin } = req.body;

    // Make a POST request to the Docker service
    const response = await fetch(
      `http://localhost:${dockerPort}/submissions?base64_encoded=true&fields=*`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id,
          source_code,
          stdin,
        }),
        credentials: "include",
      }
    );

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      // Parse the JSON response and send it to the client
      const data = await response.json();
      res.json(data);
    } else {
      // If the request was not successful, send an error status and message
      res
        .status(response.status)
        .json({ error: "Failed to submit data to Docker service" });
    }
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error submitting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// endpoint to view result of job
router.get("/jobs/:token", async (req, res) => {
  try {
    // Extract the token from the request parameters
    const { token } = req.params;

    // Make a GET request to the Docker service
    const response = await fetch(
      `http://localhost:${dockerPort}/submissions/${token}?base64_encoded=true&fields=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      // Parse the JSON response and send it to the client
      const data = await response.json();
      res.json(data);
    } else {
      // If the request was not successful, send an error status and message
      res
        .status(response.status)
        .json({ error: "Failed to fetch submission data from Docker service" });
    }
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching submission data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
