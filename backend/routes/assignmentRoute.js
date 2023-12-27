const express = require('express')
const route = express.Router()
const assignmentController = require('../controllers/assignmentController')

route.get('/', assignmentController.getAllAssignment)
route.get('/:id', assignmentController.getAssignmentById)
route.post('/', assignmentController.createAssignment)
route.put('/:id', assignmentController.updateAssignment)
route.delete('/:id', assignmentController.deleteAssignment)


module.exports = route