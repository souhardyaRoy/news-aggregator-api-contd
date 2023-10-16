const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
const port = 8080;

app.use("/newsApp", require("./src/routes/userRegister"));

if (process.env.Node_env != "test") {
  mongoose
    .connect(process.env.DB_URI, {
      socketTimeoutMS: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the db");
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
}

app.listen(port, () => {
  console.log("Server is listening to the port 8080");
});

module.exports = app 