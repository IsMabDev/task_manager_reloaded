
const router = require("express").Router();
const passport = require('passport')
const userController = require('../controllers/userController')
const { ensureAuthenticated } = require('../configs/passportJSConfig')

router.get("/", (req, res) => res.render("index"));
router.get("/index", (req, res) => res.render("index"));
// router.get('/sign-up', (req, res) => res.render('sign-up'));
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render('dashboard')
});
router.post('/sign-up',userController.createUser)
router.get('/login', (req, res) => res.render('login'));
router.post(
  "/login",
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info.message }); // Login failed
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.json({ message: 'Login successful', user }); // Login succeeded
      });
    })(req, res, next);
  })
    


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});
router.get('/login-failed', (req, res) => res.render('login',{message:"Login failed"}));

module.exports = router;
