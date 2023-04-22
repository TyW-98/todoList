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
  date: {
    type: String,
  },
});

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Need to enter task name"],
  },
  items: {
    type: [taskSchema],
  },
});

const Task = mongoose.model("Task", taskSchema);

const List = mongoose.model("List", listSchema);

const task1 = new Task({
  name: "Welcome to the todo list",
  date: date.getTodaysDate(),
});

const task2 = new Task({
  name: "Enter new task below and press + to add new task",
  date: date.getTodaysDate(),
});

const task3 = new Task({
  name: "Check the tick box to delete task",
  date: date.getTodaysDate(),
});

const defaultItems = [task1, task2, task3];

app.get("/", (req, res) => {
  let listType = "Home";

  Task.find().then((task) => {
    if (task.length === 0) {
      Task.insertMany(defaultItems)
        .then(() => {
          console.log("Successfully added task to database");
        })
        .catch((err) => {
          console.log(err);
        });
      res.redirect("/");
    }
    res.render("list", {
      listType: listType,
      taskList: task,
    });
  });
});

app.post("/", (req, res) => {
  const newTask = new Task({
    name: req.body.newTask,
    date: date.getTodaysDate(),
  });
  newTask.save();
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  Task.findByIdAndDelete({ _id: req.body.checkbox })
    .then(() => console.log("Task deleted"))
    .catch((err) => console.log(err));

  res.redirect("/");
});

app.get("/:customListName", (req, res) => {
  if (req.params.customListName.toLowerCase() === "home") {
    res.redirect("/");
  } else {
    List.findOne({ name: req.params.customListName }).then((list) => {
      if (!list || list.length === 0) {
        const newList = new List({
          name: req.params.customListName,
          items: defaultItems,
        });
        newList.save();
        res.render("list", {
          listType: req.params.customListType,
          taskList: newList.items,
        });
      } else {
        console.log("Not Working")
      }
    });
  } 
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
