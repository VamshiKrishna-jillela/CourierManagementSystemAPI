const router = require("express").Router();
const userController = require("../controllers/userController");
const {authorize}=require('../middlewareUtilityFunctions/verifyToken');

router.post('/forgotPassword', userController.forgotPassword);

//user signup
router.post('/signUp', userController.signUp);

//user login
router.post('/login', userController.login);

// user profile update
router.post('/updateProfile',authorize,userController.updateProfile);

// getting the courier data in which user is involved as a sender or receiver
router.get('/getMyCourierData', authorize,userController.getMyCourierData);

//getting the user profile data
router.get('/getMyProfile',authorize ,userController.getMyProfile);

module.exports =router;