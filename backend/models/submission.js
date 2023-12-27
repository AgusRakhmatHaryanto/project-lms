"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Submission dimiliki oleh satu Assignment
      Submission.belongsTo(models.Assignment, { foreignKey: "assignmentId" });

      // Submission dimiliki oleh satu User
      Submission.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Submission.init(
    {
      assignmentId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      submissionTime: DataTypes.DATE,
      submissionFile: DataTypes.STRING,
      comments: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
