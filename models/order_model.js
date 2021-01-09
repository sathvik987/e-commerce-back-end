const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    productnames: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Order received'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }

})
module.exports = mongoose.model('order', orderSchema)
