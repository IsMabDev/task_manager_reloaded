
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
const usersRoutes = require("./routes/usersRouter");
const indexRouter = require("./routes/indexRouter");
const tasksRouter = require("./routes/tasksRouter");
const categoriesRouter=require('./routes/categoriesRouter')
const {
  configPassport,
  ensureAuthenticated,
} = require("./configs/passportJSConfig");
const { task } = require("./models/prismaClient");
configPassport(app)

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use("/", indexRouter);
app.use("/users", usersRoutes);
app.use('/tasks', ensureAuthenticated, tasksRouter)
app.use('/categories', ensureAuthenticated, categoriesRouter)

app.use(errorsHandler, (err, req, res, next) => {
  console.log("error handler called");
}); 

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => console.log(`Express app listening on port 	${PORT}!`));
