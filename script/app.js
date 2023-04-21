const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");
const date = require(path.join(__dirname, "todaysDate.js"));
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB")

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Need to enter task name"]
  }
});

const Task = mongoose.model("Task", taskSchema);

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const fullDate = date.getTodaysDate();

app.get("/", (req, res) => {
  let listType = "Home";
  res.render("list", {
    listType: listType,
    todayFullDate: fullDate,
    taskList: homeTaskList,
  });
});

app.post("/", (req, res) => {
  if (req.body.submitBtn === "Home") {
    homeTaskList.push(req.body.newTask);
    res.redirect("/");
  } else {
    workTaskList.push(req.body.newTask);
    res.redirect("/work");
  }
});

app.get("/work", (req, res) => {
  let listType = "Work";
  res.render("list", {
    listType: listType,
    todayFullDate: fullDate,
    taskList: workTaskList,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
