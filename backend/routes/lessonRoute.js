const express = require('express');
const route = express.Router()
const lessonController = require('../controllers/lessonController')


route.get('/', lessonController.getAllLessons)
route.get('/:id', lessonController.getLessonById)
route.post('/', lessonController.createLesson)
route.put('/:id', lessonController.updateLesson)
route.delete('/:id', lessonController.deleteLesson)


module.exports = route
