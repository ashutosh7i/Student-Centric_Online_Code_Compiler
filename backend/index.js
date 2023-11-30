const express = require("express");
const app = express();
const path = require("path");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const codeRoute = require("./routes/codedb");
const compileRoute = require("./routes/compile");
require("dotenv").config();

let corsOptions = {
  origin: ["http://localhost:5000", "http://localhost:3000"],
  credentials: true,
};

app.use(express.json());
//app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:5000",
    "Access-Control-Allow-Credentials",
    true
  );
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "Access-Control-Allow-Credentials",
    true
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

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

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

// Authentication route
app.use("/auth", authRoute);

// Code Saving route
app.use("/codedb", codeRoute);

// Compilation Route
app.use("/compile", compileRoute);

//on / serving the build app
app.use(express.static(path.join(__dirname, "../client/chakra-client/build")));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
