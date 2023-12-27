const express = require('express')
const route = express.Router()
const CourseController =require('../controllers/courseController')


route.get('/', CourseController.getAllCourses)
route.get('/:id', CourseController.getCourseById)
route.post('/', CourseController.createCourse)
route.put('/:id', CourseController.updateCourse)
route.delete('/:id', CourseController.deleteCourse)


module.exports = route