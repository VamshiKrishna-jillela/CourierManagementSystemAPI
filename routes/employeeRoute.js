const router = require("express").Router();
const employeeController = require("../controllers/employeeController");
const {authorize}= require('../middlewareUtilityFunctions/verifyToken');

//signUp
router.post('/signUp', employeeController.signUp);

//login
router.post('/login', employeeController.login);

//updateProfile
router.post('/updateProfile', authorize, employeeController.updateProfile);

//new courier registration for transport
router.post('/createCourier',authorize, employeeController.createCourier);   

//filter couriers by query parameters 
router.post('/filterCourierData', authorize, employeeController.filterCourierData);

//updating the status of the courier transportation
router.post('/updateCourierStatus', authorize, employeeController.updateCourierStatus);


module.exports=router;