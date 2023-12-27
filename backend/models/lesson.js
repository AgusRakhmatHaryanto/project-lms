"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Lesson dimiliki oleh satu User sebagai instructor
      Lesson.belongsTo(models.User, {
        foreignKey: "instructorId",
        as: "instructor",
      });

      // Lesson dimiliki oleh satu Course
      Lesson.belongsTo(models.Course, { foreignKey: "courseId" });
    }
  }
  Lesson.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      creationDate: DataTypes.DATE,
      instructorId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
