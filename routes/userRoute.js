const router = require("express").Router();
const userController = require("../controllers/userController");

router.post('/signUp', userController.signUp);

router.post('/login', userController.login);

router.post('/updateProfile',userController.updateProfile);

router.get('/getMyCourierData', userController.getMyCourierData);

module.exports =router;