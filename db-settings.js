const { Sequelize } = require("sequelize");
const pg = require("pg");

module.exports = new Sequelize(process.env.DATABASE_URL, {
   // dialect: "postgres",
   dialectModule: pg,
   // user: process.env.PGUSER,
   // password: process.env.PGPASSWORD,
   // host: process.env.PGHOST,
   // PORT: process.env.PGPORT,
});
