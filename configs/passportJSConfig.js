const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const prisma = require("../models/prismaClient");

exports.configPassport=(app) => {

  app.use(
    session({
      secret: "your-secret-key", // Replace with a secure key
      resave: false, // Prevents session from being saved back to the store if it wasn't modified
      saveUninitialized: false, // Prevents uninitialized sessions from being saved to the store
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour, adjust as needed
      },
    })
  );

  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  }); 

  passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({ where: { id: id } });
    done(null, user);
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" }, // Explicitly define the field names

      async (email, password, done) => {  

        // 1. Look up the user in the database.
        const user = await prisma.user.findUnique({ where: { email: email } }); 

        if (!user) {
          // 2. If the user doesn't exist, return an error.
          return done(null, false, { message: "Invalid email or password" });   
        }

        // 3. Verify the password.
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          // If the password is incorrect, return an error.
          return done(null, false, { message: "Invalid email or password" });
        }

        // If the password is correct, return the user.
        return done(null, user);
      }
    )
  );
 


};

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};



