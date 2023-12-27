const Model = require("../models");
const { Lesson, User, Course } = Model;

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
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
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({
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

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    res.status(200).json({
      message: "Success",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.createLesson = async (req, res) => {
  try {
    const { title, content, creationDate, instructorId, courseId } = req.body;

    const instructor = await User.findByPk(instructorId);
    if (!instructor || instructor.userType !== "instructor") {
      return res.status(404).json({
        message: "Instructor not found or unauthorized",
      });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found or unauthorized",
      });
    }

    const lesson = await Lesson.create({
      title,
      content,
      creationDate,
      instructorId,
      courseId,
    });

    res.status(201).json({
      message: "Success create lesson",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed create lesson",
      data: error,
    });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const { title, content, creationDate, instructorId, courseId } = req.body;

    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    const instructor = await User.findByPk(instructorId);
    if (!instructor || instructor.userType !== "instructor") {
      return res.status(404).json({
        message: "Instructor not found or unauthorized",
      });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found or unauthorized",
      });
    }

    await lesson.update({
      title,
      content,
      creationDate,
      instructorId,
      courseId,
    });

    res.status(200).json({
      message: "Success update lesson",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed update lesson",
      data: error,
    });
  }
};


exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }
    await lesson.destroy();
    res.status(200).json({
      message: "Success delete lesson",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed delete lesson",
      data: error,
    });
  }
}