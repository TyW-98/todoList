const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

const dateOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  weekday: "long",
};

const fullDate = new Date().toLocaleDateString("en-us", dateOptions);
let homeTaskList = [];
let workTaskList = [];

app.get("/", (req, res) => {
  let listType = "Home"
  res.render("list", { listType: listType, todayFullDate: fullDate, taskList: homeTaskList });
});

app.post("/", (req, res) => {
  homeTaskList.push(req.body.newTask);
  res.redirect("/");
});

app.get("/work", (req, res) => {
  let listType = "Work"
  res.render("list", { listType: listType, todayFullDate: fullDate, taskList: workTaskList });
});

app.post("/work", (req, res) => {
  workTaskList.push(req.body.newTask)
  res.redirect("/work")
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


