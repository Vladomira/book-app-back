require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/index.js");
const router = require("./routes/index");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = process.env.PORT || "8080";

const bodyParser = require("body-parser");
router.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use("/api", router);

const start = async () => {
   try {
      app.listen(`${PORT}`, () =>
         console.log(`Hello, I'm a shop on port ${PORT}`)
      );
   } catch (error) {
      console.log("my error:", error);
   }
};

start();
