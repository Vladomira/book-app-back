require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
// const sequelize = require("./config/config.json");
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
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded());
app.use("/api", router);
// app.get("/5", function (req, res) {
//    return res.sendFile(path.join(__dirname + "/index.html"));
//    // return res.;
// });

const start = async () => {
   try {
      // await sequelize.authenticate();
      // await sequelize.sync();

      app.listen(`${PORT}`, () =>
         console.log(`Hello, I'm a shop on port ${PORT}`)
      );
   } catch (error) {
      console.log("my error:", error);
   }
};

start();
