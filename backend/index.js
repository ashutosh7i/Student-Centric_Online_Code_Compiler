const express = require("express");
const app = express();
const cors = require("cors");
// const authRoute = require("./routes/auth");
const codeRoute = require("./routes/codedb");
const compileRoute = require("./routes/compile");
require("dotenv").config();

let corsOptions = {
  origin: ["http://localhost:5000", "http://localhost:3000"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

// Authentication route
// app.use("/auth", authRoute);

// Code Saving route
app.use("/codedb", codeRoute);

// Compilation Route
app.use("/compile", compileRoute);

//serve frontend from nginx

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
