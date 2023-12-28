const express = require('express')
const route = express.Router()
const submissionController = require('../controllers/submissionController')


route.get('/', submissionController.getAllSubmission)
route.get('/:id', submissionController.getSubmissionById)
route.post('/', submissionController.createSubmission)
route.put('/:id', submissionController.updateSubmission)
route.delete('/:id', submissionController.deleteSubmission)


module.exports = route