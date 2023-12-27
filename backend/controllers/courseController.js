const Model = require('../models')
const  Course = Model.Course
const User = Model.User


exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: [
                {
                    model: User,
                    as: 'instructor',
                    attributes: ['id','fullName','email'],
                },
            ],
            order: [['name', 'ASC']],
        });

        res.status(200).json({
            message: "Success",
            data: courses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed",
            data: error.message
        });
        
    }
};



exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findOne({
            include: [
                {
                    model: User,
                    as: 'instructor',
                    attributes: ['id','fullName','email'],
                }
            ],
            where: {
                id: req.params.id
            }
        })
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }
        res.status(200).json({
            message: "Succes",
            data: course
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed",
            data: error
        })
    }
}

// exports.createCourse = async (req, res) => {
//     try {
//         const course = await Course.create(req.body)

//         if (!instructorId) {
//             return res.status(404).json({
//                 message: "Instructor not found"
//             })
//         }
//         if (User.id !== course.instructorId) {
//             return res.status(401).json({
//                 message: "Unauthorized"
//             })
//         }
//         if (User.userType !== 'instructor') {
//             return res.status(401).json({
//                 message: "Unauthorized"
//             })
//         }
//         res.status(201).json({
//             message: "Succes create course",
//             data: course
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed create course",
//             data: error
//         })
//     }
// }



exports.createCourse = async (req, res) => {
    try {
        const { name, description, instructorId } = req.body;

        const instructor = await User.findByPk(instructorId);
        if (!instructor || instructor.userType !== 'instructor') {
            return res.status(404).json({
                message: "Instructor not found or unauthorized",
            });
        }

        const course = await Course.create({
            name,
            description,
            instructorId,
        });

        res.status(201).json({
            message: "Success create course",
            data: course,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed create course",
            data: error.message,
        });
    }
};


exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const { name, description } = req.body;

        const course = await Course.findOne({
            where: {
                id: courseId
            }
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const [updatedRow, [updatedCourse]] = await Course.update(
            {
                name,
                description
            },
            {
                where: {
                    id: courseId
                },
                returning: true
            }
        );

        res.status(200).json({
            message: "Success update course",
            data: updatedCourse
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed update course",
            data: error
        });
        console.error(error);
    }
};


exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findOne({
            where: {
                id: courseId
            }
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        await Course.destroy({
            where: {
                id: courseId
            }
        });

        res.status(200).json({
            message: "Success delete course"
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed delete course",
            data: error
    })
    }
}