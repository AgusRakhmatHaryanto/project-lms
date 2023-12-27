const express = require('express')
const app = express()
const indexRoute = require('./routes/indexRoute')
require('./config/db')
require('dotenv').config()
require('morgan')
const PORT = process.env.ENV_PORT
const API = process.env.API_VERSION


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(indexRoute)



app.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}/${API}/`)
})