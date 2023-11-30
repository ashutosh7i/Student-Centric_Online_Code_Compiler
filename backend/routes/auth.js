const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = process.env.CLIENT_URL;

//login route
router.post("/login/password", (req, res, next) => {
  passport.authenticate(
    "local",
    {
      successRedirect: CLIENT_URL,
      failureRedirect: "/auth/login/failed",
    },
    function (req, res) {
      //console.log("login/password2");
      res.redirect("/~" + req.user.username);
    }
  );
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
