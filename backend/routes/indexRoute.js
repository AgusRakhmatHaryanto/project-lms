const express = require('express')
const router = express.Router()
const userRouter = require('./userRoute')
const courseRouter = require('./courseRoute')
const lessonRoute = require('./lessonRoute')
const assignmentRoute = require('./assignmentRoute')
const multer = require("multer");
// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
require('dotenv').config()
const API = process.env.API_VERSION


router.use(upload.any())
router.use(`/${API}/users`, userRouter)
router.use(`/${API}/courses`, courseRouter)
router.use(`/${API}/lessons`, lessonRoute)
router.use(`/${API}/assignments`, assignmentRoute)

module.exports = router