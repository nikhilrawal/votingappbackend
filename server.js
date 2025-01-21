const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const { jwtAuthMiddleware, jwtgeneratetoken } = require('../jwt')

userroute = require('./routes/userRoutes')
candidateroute = require('./routes/candidateRoutes')

app.use('/user', userroute)
app.use('/candidate', jwtAuthMiddleware, candidateroute)

port = process.env.Port || 3000
app.listen(port, () => {
    console.log('listening to port number ', port)
})