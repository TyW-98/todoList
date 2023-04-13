const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");

const app = express();

const dateOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  weekday: "long",
};
const fullDate = new Date().toLocaleDateString("en-us", dateOptions);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("list", { todayFullDate: fullDate });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
