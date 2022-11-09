const express = require('express');
const app = express();

//routing to respective routes..
const userRoute = require('./routes/userRoute');
const employeeRoute=require('./routes/employeeRoute');
const CourierSearchRoute=require('./routes/CourierSearchRoute');
const postTrimmer= require('./middlewareUtilityFunctions/trim');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(postTrimmer);



//to user-routes
app.use("/api/user",userRoute);


// to employee-routes 
app.use("/api/employee",employeeRoute);


// to-search-courier-by-courier-id
app.use("/api/courierSearch",CourierSearchRoute);





module.exports=app;