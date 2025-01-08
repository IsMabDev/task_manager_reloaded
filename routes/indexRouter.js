
const router = require("express").Router();
const passport = require('passport')
const userController = require('../controllers/userController')
const { ensureAuthenticated } = require('../configs/passportJSConfig')

router.get("/", (req, res) => res.render("index"));
router.get("/index", (req, res) => res.render("index"));
router.get('/sign-up', (req, res) => res.render('sign-up'));
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render('dashboard')
});
router.post('/sign-up',userController.createUser)
router.get('/login', (req, res) => res.render('login'));
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: '/dashboard',
    successFlash: "Welcome back!",
    failureFlash: "Invalid username or password.",
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});
router.get('/login-failed', (req, res) => res.render('login',{message:"Login failed"}));

module.exports = router;
