const express = require('express')
const router = express.Router()
const orders = require('../models/order_model')


router.post('/neworder', (req, res) => {

    const { username, email, address, productname, quantity, status, date } = req.body

    const order = new orders({
        username, email, address, productname, quantity, status, date
    })

    order.save()
        .then(savedOrder => {
            res.json(savedOrder)
        })
        .catch(err => {
            res.json("error" + err)
        })



})


router.get('/allorders', (req, res) => {

    orders.find()
        .then(allOrder => {
            res.json(allOrder)
        })
        .catch(err => {
            res.json("error" + err)
        })

})

module.exports = router