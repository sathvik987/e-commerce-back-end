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
    productname: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        required: true,
        default: 'order received'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }

})
module.exports = mongoose.model('order', orderSchema)
