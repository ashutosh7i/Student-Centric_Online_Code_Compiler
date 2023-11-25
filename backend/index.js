const express = require("express");
const app = express();
const path = require("path");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const codeRoute = require("./routes/codeRepo");

app.use(express.json());

// Set up cookie session
app.use(
  cookieSession({
    name: "session",
    keys: ["openreplay"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// // Serving frontend from the same server
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// Authentication route
app.use("/auth", authRoute);

// Code repo route
app.use("/codedb", codeRoute);

//on / serving the build app
app.use(express.static(path.join(__dirname, "../client/chakra-client/build")));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
