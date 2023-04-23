const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");
const date = require(path.join(__dirname, "todaysDate.js"));
const mongoose = require("mongoose");
const _ = require("lodash");

require("dotenv").config({ path: ".env" });

const app = express();

mongoose.connect(process.env.URL);

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
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
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

  if (req.body.submitBtn.toLowerCase() === "home") {
    newTask.save();
    res.redirect("/");
  } else {
    List.findOne({ name: req.body.submitBtn.toLowerCase() }).then((list) => {
      list.items.push(newTask);
      list.save();
      res.redirect("/" + req.body.submitBtn.toLowerCase());
    });
  }
});

app.post("/delete", (req, res) => {
  if (req.body.listName.toLowerCase() === "home") {
    Task.findByIdAndDelete({ _id: req.body.checkbox })
      .then(() => console.log("Task deleted"))
      .catch((err) => console.log(err));

    res.redirect("/");
  } else {
    List.findOneAndUpdate(
      { name: req.body.listName.toLowerCase() },
      { $pull: { items: { _id: req.body.checkbox } } }
    )
      .then(() => {
        res.redirect("/" + req.body.listName.toLowerCase());
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.get("/:customListName", (req, res) => {
  if (req.params.customListName.toLowerCase() === "home") {
    res.redirect("/");
  } else {
    List.findOne({ name: req.params.customListName.toLowerCase() }).then((list) => {
      if (!list) {
        const newList = new List({
          name: req.params.customListName.toLowerCase(),
          items: defaultItems,
        });
        newList.save();
        res.redirect("/" + req.params.customListName);
      } else {
        res.render("list", {
          listType: _.startCase(list.name),
          taskList: list.items,
        });
      }
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
