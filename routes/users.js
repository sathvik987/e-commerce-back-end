const express = require('express')
const router = express.Router()
const users = require('../models/user_model')
const admin = require('../models/admin_model')
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new users({
        name: name,
        email: email,
        password: hash
    })

    user.save()
        .then(savedUser => {
            savedUser = savedUser.toObject()
            delete savedUser.password;
            res.json(savedUser)
        })
        .catch(err => {
            res.json("error" + err)
        })
})


router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }

    users.findOne({ email: email })
        .then(user => {
            const isValid = bcrypt.compareSync(password, user.password)
            if (isValid) {
                user = user.toObject()
                delete user.password;
                res.json(user)
            } else {
                res.status(400).json('worng credentials')
            }
        })
        .catch(err => {
            res.json("error" + err)
        })
})


router.post('/adminregister', (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const ad = new admin({
        userName: userName,
        password: hash
    })

    ad.save()
        .then(savedUser => {
            savedUser = savedUser.toObject()
            delete savedUser.password;
            res.json(savedUser)
        })
        .catch(err => {
            res.json("error" + err)
        })
})


router.post('/adminLogin', (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json('incorrect form submission');
    }

    admin.findOne({ userName: userName })
        .then(user => {
            const isValid = bcrypt.compareSync(password, user.password)
            if (isValid) {
                user = user.toObject()
                delete user.password;
                res.json(user)
            } else {
                res.status(400).json('worng credentials')
            }
        })
        .catch(err => {
            res.json("error" + err)
        })
})
module.exports = router