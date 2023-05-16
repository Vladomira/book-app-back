const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASSWORD,
   {
      dialect: "postgres",
      user: "root",
      password: "science",
      host: process.env.DB_HOST || "localhost",
      PORT: process.env.DB_PORT,
   }
);
