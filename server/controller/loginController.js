const express = require('express');
const router = express.Router();
const SignUser = require('../model/signupModel');
const jwt = require('jsonwebtoken');


module.exports = {
    signup: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            let data = await SignUser.findOne({ email: email });
            if (data) {
                res.status(208).send({ message: "user already regisster with us" })
            } else {
                const user = new SignUser({
                    email, password
                });
                let resultdata = await jwt.sign({ userdata: user }, 'secret')
                if (resultdata) {
                    let result = await user.save();
                    res.send({ token: resultdata });

                }
            }
        } catch (error) {
            res.status(500).send(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            let data = await SignUser.findOne({ email: req.body.username });
            if (data == null || data == undefined) {
                res.status(208).send({ message: "user is not register with us" })
            } else {

                if (data.password === req.body.password) {
                    let resultdata = await jwt.sign({ userdata: data }, 'secret')
                    res.send({ email: req.body.username, token: resultdata });
                } else {
                    res.status(400).send({ message: "password does not match " })
                }

            }
        } catch (error) {
            res.status(500).send(error)
        }
    }

}