const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");
const date = require(path.join(__dirname, "todaysDate.js"));
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Need to enter task name"],
  },
});

const Task = mongoose.model("Task", taskSchema);

const task1 = new Task({
  name: "task1",
});

const task2 = new Task({
  name: "task2",
});

const task3 = new Task({
  name: "task3",
});

const defaultItems = [task1, task2, task3];

// Task.insertMany(defaultItems)
//   .then(() => {
//     console.log("Successfully added task to database");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const fullDate = date.getTodaysDate();

app.get("/", (req, res) => {

  let listType = "Home";

  Task.find().then (task => {
    res.render("list", {listType: listType, todayFullDate: fullDate, taskList: task})
  })

});

// app.post("/", (req, res) => {
//   if (req.body.submitBtn === "Home") {
//     homeTaskList.push(req.body.newTask);
//     res.redirect("/");
//   } else {
//     workTaskList.push(req.body.newTask);
//     res.redirect("/work");
//   }
// });

// app.get("/work", (req, res) => {
//   let listType = "Work";
//   res.render("list", {
//     listType: listType,
//     todayFullDate: fullDate,
//     taskList: workTaskList,
//   });
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
