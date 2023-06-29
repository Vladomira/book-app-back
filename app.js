require("dotenv").config();
const redis = require("redis");
const express = require("express");
const sequelize = require("./db-settings");
const models = require("./database/models/index.js");
const router = require("./src/routes/index");
const cors = require("cors");
const ErrorMidlware = require("./src/midlware/ErrorMidlware");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 8080;
const app = express();

const bodyParser = require("body-parser");
router.use(bodyParser.json());
app.use(cookieParser());

app.use(
   cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      optionSuccessStatus: 200,
   })
);

app.use(express.json());
app.use("/api", router);
app.use(ErrorMidlware);

// const client = redis.createClient({
//    url: process.env.DATABASE_URL,
// });

const start = async () => {
   try {
      await sequelize.sync();
      // await client.connect();
      app.listen(port, () => console.log(`Hello, I'm an app on port ${port}`));
   } catch (error) {
      console.log("my error:", error);
   }
};
start();
