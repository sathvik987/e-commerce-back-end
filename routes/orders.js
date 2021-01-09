const express = require('express')
const router = express.Router()
const orders = require('../models/order_model')
const Stripe = require('stripe')

const stripe = new Stripe('sk_test_4YGOGclLFuIAIvc2obGqdj0Y00KKTEwBSX')


router.put('/neworder', (req, res) => {

    const { username, email, address, productnames, price } = req.body

    const order = new orders({
        username, email, address, productnames, price
    })

    order.save()
        .then(savedOrder => {
            res.json('saved')
        })
        .catch(err => {
            res.json("error" + err)
        })

})

router.post('/payment', async (req, res) => {
    const { amount } = req.body

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


router.post('/allorders', (req, res) => {

    const { email } = req.body

    orders.find({ email: email })
        .then(allOrder => {
            res.json(allOrder)
        })
        .catch(err => {
            res.json("error" + err)
        })

})

router.put('/cancelOrder', (req, res) => {

    const { status, date } = req.body

    orders.updateOne({ date: date }, { status: status })
        .then(allOrder => {
            res.json('updated')
        })
        .catch(err => {
            res.json("error" + err)
        })

})

module.exports = router