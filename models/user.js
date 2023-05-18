"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      static associate(models) {
         User.hasMany(models.UserBooks, { foreignKey: "userId" });
         User.hasMany(models.UserNotes, { foreignKey: "userId" });
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
