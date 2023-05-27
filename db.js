const { Sequelize } = require("sequelize");
const { DB_HOST } = process.env;

module.exports = new Sequelize({
   host: DB_HOST,
   dialect: "postgres",
   logging: false,
});
