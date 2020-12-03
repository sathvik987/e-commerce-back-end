const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/users')

const url = 'mongodb://localhost/e-commerce'

const app = express()

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const con = mongoose.connection
con.on('open', () => {
    console.log('connected to db')
})

app.use(express.json())
app.use('/users', users)

app.listen(9000, () => {
    console.log('server started')
})
