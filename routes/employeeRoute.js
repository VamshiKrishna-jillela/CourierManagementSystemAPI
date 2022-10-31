const router = require("express").Router();
const employeeController = require("../controllers/employeeController");
//signUp
router.post('/signUp', employeeController.signUp);

//login
router.post('/login', employeeController.login);

//updateProfile
router.post('/updateProfile',employeeController.updateProfile);

//new courier registration for transport
router.post('/createCourier', employeeController.createCourier);   

//filter couriers by query parameters 
router.get('/filterCourierData', employeeController.filterCourierData);

//updating the status of the courier transportation
router.post('/updateCourierStatus', employeeController.updateCourierStatus);

module.exports=router;