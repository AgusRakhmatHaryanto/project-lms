const Model = require("../models");
const { Assignment, User, Course } = Model;

exports.getAllAssignment = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      include: [
        {
          model: User,
          as: "instructor",
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
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      include: [
        {
          model: User,
          as: "instructor",
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

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      message: "Success",
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const {
      title,
      description,
      deadline,
      creationDate,
      instructorId,
      courseId,
    } = req.body;

    const instructor = await User.findByPk(instructorId);
    if (!instructor || instructor.userType !== "instructor") {
      return res.status(404).json({
        message: "Instructor not found",
      });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const assignment = await Assignment.create({
      title,
      description,
      deadline,
      creationDate: new Date(),
      instructorId,
      courseId,
    });

    res.status(201).json({
      message: "Success create assignment",
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed create assignment",
      data: error.message,
    });
    console.log(error);
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const {
      title,
      description,
      deadline,
      creationDate,
      instructorId,
      courseId,
    } = req.body;

    const assignment = await Assignment.findOne({
      where: {
        id: assignmentId,
      },
    });

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const instructor = await User.findByPk(instructorId);
    if (!instructor || instructor.userType !== "instructor") {
      return res.status(404).json({
        message: "Instructor not found",
      });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    await assignment.update({
      title,
      description,
      deadline,
      creationDate: new Date(),
      instructorId,
      courseId,
    });

    res.status(200).json({
      message: "Success update assignment",
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed update assignment",
      data: error.message,
    });
  }
};


exports.deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByPk(req.params.id);
        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }
        await assignment.destroy();
        res.status(200).json({
            message: "Success delete assignment",
            data: assignment
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed delete assignment",
            data: error.message
        })
    }
}