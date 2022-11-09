const mysql=require('mysql');

if (process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

//creating connection to MYSQL server
var connection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USR,
    password:process.env.PASSWD,
    database:process.env.DB

});

//making connection to MYSQL server
connection.connect((err)=>{
    if (err) {
        console.error(err);
    }
    else{
        console.log("Connected to database");
    }
});
// console.log(connection);

module.exports=connection;
