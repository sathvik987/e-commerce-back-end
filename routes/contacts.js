const express = require('express')
const router = express.Router()
const contact = require('../models/contact_model')


router.put('/addmessage', (req, res) => {

    const { name, email, message } = req.body

    const saveMessage = new contact({
        name, email, message
    })

    saveMessage.save()
        .then(savedOrder => {
            res.json('saved')
        })
        .catch(err => {
            res.json("error" + err)
        })


})



module.exports = router