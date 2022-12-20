const express = require('express')
const dBConnect = require('./config/dbConnect')
const app = express()
const authRoutes = require('./routes/authRoutes')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const bodyParser = require('body-parser')
const { errorHandler, notFound } = require('./middlewares/errorHandler')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

dBConnect()

app.use('/api/user',authRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`The server is running in http://localhost:${PORT}/`);
})