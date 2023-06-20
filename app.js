require("dotenv").config();
const express = require("express");
const sequelize = require("./db-settings");
const models = require("./database/models/index.js");
const router = require("./src/routes/index");
const cors = require("cors");
const app = express();
// const path = require("path");
const ErrorMidlware = require("./src/midlware/ErrorMidlware");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || "8081";

const bodyParser = require("body-parser");
router.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(ErrorMidlware);

const start = async () => {
   try {
      await sequelize.sync();
      app.listen(`${PORT}`, () =>
         console.log(`Hello, I'm a shop on port ${PORT}`)
      );
   } catch (error) {
      console.log("my error:", error);
   }
};
start();
