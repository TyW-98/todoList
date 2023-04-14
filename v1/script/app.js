const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const dateOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  weekday: "long",
};

const fullDate = new Date().toLocaleDateString("en-us", dateOptions);
let taskList = [];

app.get("/", (req, res) => {
  res.render("list", { todayFullDate: fullDate, taskList: taskList });
});

app.post("/", (req, res) => {
  taskList.push(req.body.newTask);

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
