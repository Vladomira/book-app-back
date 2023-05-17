"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class UserNotes extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         UserNotes.belongsTo(models.User, { foreignKey: "userId" });
         UserNotes.belongsTo(models.UserBooks, { foreignKey: "bookId" });
      }
   }
   UserNotes.init(
      {
         chapter: DataTypes.STRING,
         text: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "UserNotes",
      }
   );
   return UserNotes;
};
