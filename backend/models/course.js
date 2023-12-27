"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Course dimiliki oleh satu User sebagai instructor
      Course.belongsTo(models.User, {
        foreignKey: "instructorId",
        as: "instructor",
      });

      // Course memiliki banyak Lesson
      Course.hasMany(models.Lesson, { foreignKey: "courseId" });

      // Course memiliki banyak Assignment
      Course.hasMany(models.Assignment, { foreignKey: "courseId" });

      // Course dapat memiliki banyak Enrollment
      Course.hasMany(models.Enrollment, { foreignKey: "courseId" });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      instructorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
