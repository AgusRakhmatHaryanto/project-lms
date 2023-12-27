'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Relasi dengan Course (User memiliki banyak Course sebagai instructor)
      User.hasMany(models.Course, { foreignKey: 'instructorId' });

      // Relasi dengan Lesson (User memiliki banyak Lesson sebagai instructor)
      User.hasMany(models.Lesson, { foreignKey: 'instructorId' });

      // Relasi dengan Assignment (User memiliki banyak Assignment sebagai instructor)
      User.hasMany(models.Assignment, { foreignKey: 'instructorId' });

      // Relasi dengan Enrollment (User dapat memiliki banyak Enrollment)
      User.hasMany(models.Enrollment, { foreignKey: 'userId' });

      // Relasi dengan Submission (User dapat memiliki banyak Submission)
      User.hasMany(models.Submission, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    fullName: DataTypes.STRING,
    userType: DataTypes.ENUM('admin', 'instructor', 'student'),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};