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

app.get("/", (req, res) => {
  res.render("list", { todayFullDate: fullDate });
});

app.post("/", (req, res) => {
    console.log(req.body.newTask);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
