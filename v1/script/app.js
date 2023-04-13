const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");

const app = express();

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',]

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const todayDate = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;
  const dayOfWeek = week[new Date().getDay()]

  res.render('list', {
    todayDate: todayDate,
    dayOfWeek: dayOfWeek
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
