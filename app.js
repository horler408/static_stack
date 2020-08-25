const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const dbConnect = require("./config/dbRemote");

const userRoute = require("./routes/userRoute");
const profileRoute = require("./routes/profileRoute");
const dashRoute = require("./routes/dashboard");

dbConnect();

//set dynamic views file
app.set("views", path.join(__dirname, "views"));
//set view engine
app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api/user", userRoute);
app.use("/api/profile", profileRoute);
app.use("/dashboard", dashRoute);

module.exports = app;
