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

router.get('/messages', (req, res) => {

    contact.find()
        .then(all => {
            res.json(all)
        })
        .catch(err => {
            res.json("error" + err)
        })
})


router.put('/messagestatus', (req, res) => {

    const { status, date, email } = req.body

    contact.updateOne({ date: date, email: email }, { status: status })
        .then(msg => {
            res.json('updated')
        })
        .catch(err => {
            res.json("error" + err)
        })

})



module.exports = router