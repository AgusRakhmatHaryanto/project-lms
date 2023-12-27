const express = require('express')
const router = express.Router()
const userRouter = require('./userRoute')
const multer = require("multer");
// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
require('dotenv').config()
const API = process.env.API_VERSION


router.use(upload.any())
router.use(`/${API}/users`, userRouter)

module.exports = router