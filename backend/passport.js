const passport = require("passport");
//
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
//
require("dotenv").config();
//
const GoogleStrategy = require("passport-google-oauth20");
//
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const pool = require("./dbPool.js");

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    console.log("LocalStrategy", username, password);
    pool.getConnection((err, connection) => {
      if (err) {
        return cb(err);
      }

      try {
        const selectQuery = "SELECT * FROM localauth_users WHERE username = ?";
        connection.query(selectQuery, [username], function (err, results) {
          if (err) {
            return cb(err);
          }
          if (!results || results.length === 0) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }

          const user = results[0];

          crypto.pbkdf2(
            password,
            user.salt,
            310000,
            32,
            "sha256",
            function (err, hashedPassword) {
              if (err) {
                return cb(err);
              }
              if (
                !crypto.timingSafeEqual(user.hashed_password, hashedPassword)
              ) {
                return cb(null, false, {
                  message: "Incorrect username or password.",
                });
              }
              return cb(null, user);
            }
          );
        });
      } catch (error) {
        console.error("Internal Server Error", error);
        return cb(error);
      } finally {
        connection.release(); // Release the connection back to the pool
      }
    });
  })
);

//using google oauth
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
