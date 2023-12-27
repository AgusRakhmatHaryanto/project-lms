const Model = require("../models");
const { Enrollment, User, Course } = Model;

exports.getAllEnrollment = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "fullName", "email"],
        },
        {
          model: Course,
          attributes: ["id", "name"],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      message: "Success",
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      include: [
        {
          model: User,
          attributes: ["id", "fullName", "email"],
        },
        {
          model: Course,
          attributes: ["id", "name"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.status(200).json({
      message: "Success",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.createEnrollment = async (req, res) => {
  try {
    const { userId, courseId, registrationDate } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const enrollment = await Enrollment.create({
      userId,
      courseId,
      registrationDate: new Date(),
    });

    res.status(201).json({
      message: "Success",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};
exports.updateEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const { userId, courseId, registrationDate } = req.body;

    const enrollment = await Enrollment.findOne({
      where: {
        id: enrollmentId,
      },
    });

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    await enrollment.update({
      userId,
      courseId,
      registrationDate: new Date(),
    });

    res.status(200).json({
      message: "Success update enrollment",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed update enrollment",
      data: error.message,
    });
  }
};


exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findByPk(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }
    await enrollment.destroy();
    res.status(200).json({
      message: "Success delete enrollment",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed delete enrollment",
      data: error.message,
    });
  }
}