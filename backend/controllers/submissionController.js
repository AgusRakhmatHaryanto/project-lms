const Model = require("../models");
const { Submission, User, Assignment } = Model;

exports.getAllSubmission = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "fullName", "email"],
        },
        {
          model: Assignment,
          attributes: ["id", "title"],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      message: "Success",
      data: submissions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findOne({
      include: [
        {
          model: User,
          attributes: ["id", "fullName", "email"],
        },
        {
          model: Assignment,
          attributes: ["id", "title"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    res.status(200).json({
      message: "Success",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      data: error.message,
    });
  }
};

exports.createSubmission = async (req, res) => {
  try {
    const { assignmentId, userId, submissionTime, submissionFile, comments } =
      req.body;

    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const submission = await Submission.create({
      assignmentId,
      userId,
      submissionTime: new Date(),
      submissionFile,
      comments,
    });

    res.status(201).json({
      message: "Success create submission",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed create submission",
      data: error.message,
    });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const { assignmentId, userId, submissionTime, submissionFile, comments } =
      req.body;
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }
    await submission.update({
      assignmentId,
      userId,
      submissionTime: new Date(),
    //   submissionFile: req.body.submissionFile,
      submissionFile, //pake multer atau lampirkan link file
      comments,
    });
    res.status(200).json({
      message: "Success update submission",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed update submission",
      data: error.message,
    });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }
    await submission.destroy();
    res.status(200).json({
      message: "Success delete submission",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed delete submission",
      data: error.message,
    });
  }
};
