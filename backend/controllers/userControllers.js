const Model = require("../models");
const User = Model.User;
const bcrypt = require("bcrypt");


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        userType: "admin",
      },
      attributes: ["id", "username", "email", "userType"],
      order: [["id", "ASC"]],
    });
    res.status(201).json({
      messaage: "Succes",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      messaage: "Failed",
      data: error,
    });
    console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(201).json({
      messaage: "Succes",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      messaage: "Failed",
      data: error,
    });
    console.log(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    // Pastikan jenis pengguna yang valid
    const allowedUserTypes = ["instructor", "student"];
    const userType = req.body.userType;

    if (!userType || !allowedUserTypes.includes(userType)) {
      return res.status(400).json({
        message: "Invalid userType. Allowed values: 'instructor', 'student'",
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashPassword,
    });
    res.status(201).json({
      messaage: "Succes",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      messaage: "Failed",
      data: error,
    });
    console.log(error);
  }
};

exports.createUserByAdmin = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashPassword,
    });
    res.status(201).json({
      messaage: "Succes create user by admin",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      messaage: "Failed create user by admin",
      data: error,
    });
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Lakukan pembaruan
    const [rowsUpdated, [updatedUser]] = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true, // Ini penting untuk mendapatkan data yang diperbarui
    });

    // rowsUpdated berisi jumlah baris yang terpengaruh oleh pembaruan
    // updatedUser berisi instance pengguna yang baru diperbarui
    if (rowsUpdated > 0) {
      res.status(201).json({
        message: "Success updated",
        data: updatedUser, // Menggunakan updatedUser untuk mendapatkan data yang diperbarui
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error,
    });
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(201).json({
      messaage: "Succes",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      messaage: "Failed",
      data: error,
    });
  }
};
