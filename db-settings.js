const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.DATABASE_URL, {
   dialect: "postgres",
   user: process.env.PGUSER,
   password: process.env.PGPASSWORD,
   host: process.env.PGHOST,
   PORT: process.env.PGPORT,
});
