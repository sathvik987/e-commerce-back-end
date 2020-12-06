const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/users')
const products = require('./routes/products')
const orders = require('./routes/orders')

const url = 'mongodb://localhost/e-commerce'

const app = express()

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const con = mongoose.connection
con.on('open', () => {
    console.log('connected to db')
})

app.use(express.json())
app.use('/uploads', express.static("uploads"))
app.use('/users', users)
app.use('/products', products)
app.use('/orders', orders)

app.listen(9000, () => {
    console.log('server started')
})
