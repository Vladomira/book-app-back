"use strict";
const { Model } = require("sequelize");
// const db = require("../models/index");

module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // User.hasMany(db.UserBooks, { foreignKey: "userId" });
      }
   }
   User.init(
      {
         name: DataTypes.STRING,
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         token: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "User",
      }
   );
   return User;
};
