const express = require('express')
const route = express.Router()
const attendenceController = require('../controllers/attendenceController')

route.get('/', attendenceController.getAllAttendance)
route.get('/:id', attendenceController.getAttendanceById)
route.post('/', attendenceController.createAttendance)
route.put('/:id', attendenceController.updateAttendance)
route.delete('/:id', attendenceController.deleteAttendance)


module.exports = route