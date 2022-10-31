const express = require('express');
const app = express();

//routing to respective routes..
const userRoute = require('./routes/userRoute');
const employeeRoute=require('./routes/employeeRoute');
const CourierSearchRoute=require('./routes/CourierSearchRoute');


//to user-routes
app.use("/api/user",userRoute);


// to employee-routes
app.use("/api/employee",employeeRoute);


// to-search-courier-by-courier-id
app.use("/api/:courierId",CourierSearchRoute);


module.exports=app;