
const express = require("express");
const errorsHandler = require("./controllers/errorsHandler");
const app = express();
const path = require("path");
app.set("views", path.join(__dirname, "views"));
require("dotenv").config();
const flash = require("connect-flash");

app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
const userRoutes = require("./routes/userRouter");
const indexRouter = require("./routes/indexRouter");
const {
  configPassport,
  ensureAuthenticated,
} = require("./configs/passportJSConfig");
configPassport(app)

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use("/", indexRouter);
app.use("/users", userRoutes);

app.use(errorsHandler, (err, req, res, next) => {
  console.log("error handler called");
}); 

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => console.log(`Express app listening on port 	${PORT}!`));
