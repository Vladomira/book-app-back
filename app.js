require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/index.js");
const router = require("./routes/index");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = process.env.PORT || "8080";
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

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
// postgres://ytojzpomxrwshc:a12782e45b385c1fd188f58df2054ac9a81637d4e289d6ad839cd093c50cd9d9@ec2-34-236-103-63.compute-1.amazonaws.com:5432/ds8fjfmi7cdgm
