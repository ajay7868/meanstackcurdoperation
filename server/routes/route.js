const express = require('express');
const router = express.Router()
const userController = require('../controller/userController');
const loginController = require('../controller/loginController');
const token = require('../middleware/token');


router.delete('/v1/user/:id',token, userController.delete)
router.get('/v1/user', userController.all);
router.post('/v1/user',token, userController.post);
router.patch('/v1/user/:id',token, userController.patch);
router.get('/v1/user/:id', userController.singleuser);


router.post('/v1/user/signup', loginController.signup);
router.post('/v1/user/login', loginController.login);

module.exports = router
