"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Assignment dimiliki oleh satu User sebagai instructor
      Assignment.belongsTo(models.User, {
        foreignKey: "instructorId",
        as: "instructor",
      });

      // Assignment dimiliki oleh satu Course
      Assignment.belongsTo(models.Course, { foreignKey: "courseId" });
    }
  }
  Assignment.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      deadline: DataTypes.DATE,
      creationDate: DataTypes.DATE,
      instructorId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Assignment",
    }
  );
  return Assignment;
};
