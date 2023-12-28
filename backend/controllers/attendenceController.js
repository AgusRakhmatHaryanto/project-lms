const Model = require("../models");
const { Attendance, User } = Model;

exports.getAllAttendance = async (req, res) => {
  try {
    const attendances = await Attendance.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "fullName", "email"],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      message: "Success",
      data: attendances,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      include: [
        {
          model: User,
          attributes: ["id", "fullName", "email"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      message: "Success",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const { userId, date, status } = req.body;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const attendance = await Attendance.create({
      userId,
      date: new Date(),
      status,
    });

    res.status(201).json({
      message: "Success",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const { userId, date, status } = req.body;

    const attendance = await Attendance.findOne({
      where: {
        id: attendanceId,
      },
    });

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedAttendance = await attendance.update({
      userId,
      date: new Date(),
      status,
    });

    res.status(200).json({
      message: "Success",
      data: updatedAttendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const attendance = await Attendance.findByPk(attendanceId);
    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }
    await attendance.destroy();
    res.status(200).json({
      message: "Success",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
}