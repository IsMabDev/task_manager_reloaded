require("dotenv").config();
const express = require("express");
const app = express();
app.set("view engine", "ejs");
const userRoutes = require("./routes/userRoutes");

app.use("/", userRoutes);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => console.log(`Express app listening on port 	${PORT}!`));
