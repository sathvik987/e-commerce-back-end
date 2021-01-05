const express = require('express')
const router = express.Router()
const orders = require('../models/order_model')
const Stripe = require('stripe')

const stripe = new Stripe('sk_test_4YGOGclLFuIAIvc2obGqdj0Y00KKTEwBSX')


router.post('/neworder', (req, res) => {

    const { username, email, address, productname, quantity, status, date, price } = req.body

    const order = new orders({
        username, email, address, productname, quantity, status, date, price
    })

    order.save()
        .then(savedOrder => {
            res.json(savedOrder)
        })
        .catch(err => {
            res.json("error" + err)
        })

})

router.post('/payment', async (req, res) => {
    const { amount, email } = req.body

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'inr'
        })
        res.status(200).send(paymentIntent.client_secret)
    } catch (err) {
        res.status(500).send(err)
    }

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