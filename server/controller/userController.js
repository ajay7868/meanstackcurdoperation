const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const status = require('http-status');

module.exports = {
    post: async (req, res, next) => {
        try {
            let { name, email, phone, address, signuser } = req.body;
            let data = new User({
                name: name,
                email: email,
                phone: phone,
                address: address,
                signuser: signuser
            })
            const user = await User.findOne({ email: email });
            console.log("user",user)
            if (user) {
                res.status(208).send({ message: "this email already register with us" })
            }
            let result = await data.save();
            res.send(result);

        } catch (error) {
            res.status(500).send(error)
        }
    },

    patch: async (req, res, next) => {
        try {
            let loginuser = req.body.signuser;

            let userdata = await User.findOne({ _id: req.params.id });

            if (JSON.stringify(loginuser) == JSON.stringify(userdata.signuser)) {


                let data = await User.findByIdAndUpdate(req.params.id, { $set: req.body });

                res.status(200).send({ message: 'success' });

            } else {

                res.status(304).send({ message: "you can only edit yuor own user" })
            }
        }
        catch (error) {
            res.status(500).send(error)
        }
    },

    singleuser: async (req, res, next) => {
        try {

            let data = await User.findOne({ _id: req.params.id });
            if (data.length == 0) {
                res.status(404).send({ message: "no user found" })
            }
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            let loginuser = req.body.signuser;
            let userdata = await User.findOne({ _id: req.params.id });
            if (JSON.stringify(loginuser) == JSON.stringify(userdata.signuser)) {
                let result = await User.findByIdAndRemove({ _id: req.params.id })
                if (!result) {
                    res.status(401).send({ message: "user not delete" })
                }
                res.status(200).send({ message: "user delete succesfully" });
            } else {
                res.status(304).send({ message: "you can only delete own user" });
            }
        } catch (error) {
            res.status(500).send(error)
        }
    },

    all: async (req, res, next) => {
        try {
            let data = await User.find({});
            if (data.length == 0) {
                res.status(404).send({ message: "no user found " })
            }
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send(error)
        }
    },


}

