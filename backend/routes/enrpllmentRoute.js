const express = require('express')
const route = express.Router()
const enrollmentController = require('../controllers/enrollmentController')

route.get('/', enrollmentController.getAllEnrollment)
route.get('/:id', enrollmentController.getEnrollmentById)
route.post('/', enrollmentController.createEnrollment)
route.put('/:id', enrollmentController.updateEnrollment)
route.delete('/:id', enrollmentController.deleteEnrollment)

module.exports = route
