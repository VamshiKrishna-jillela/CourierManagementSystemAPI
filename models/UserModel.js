 const sql  = require('./db.js');

 class User {

     //ideal constructor meeting the requirements of the entity in the database,
     constructor(body) {
          this.user_id = body.id;
          this.user_name = body.user_name;
          this.user_email = body.user_email;
          this.user_password = body.user_password;
          this.user_phone_number = body.user_phone_number;
          this.user_address = body.user_address;
          this.user_city = body.user_city;
          this.user_state = body.user_state;
          this.user_pincode = body.user_pincode;
     }


     // creating the new user profile
     create(result) {
          sql.query(`INSERT INTO User(user_name,user_email,user_password,user_phone_number,user_address,user_city,user_state,user_pincode) values ('${this.user_name}','${this.user_email}','${this.user_password}',${this.user_phone_number},'${this.user_address}','${this.user_city}','${this.user_state}',${this.user_pincode})`, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               else {
                    result(null, res);
                    return;
               }
          });
     }

     //fetching the user data by phone number
     static findByPhone(user_phone_number,result) {
          console.log(this);
          sql.query(`SELECT user_id,user_phone_number, user_password FROM User WHERE user_phone_number = '${user_phone_number}'`, (err, res) => {
               console.log(err);
               console.log(res);
               if (err) {
                    result(err, null);
                    return;
               }
               else {
                    result(null, res);
                    return;
               }
          });
     }

     //updating the user data by id
     update(result) {
          console.log(this);
     let Query=`UPDATE User SET `;
     if(this.user_name) Query += ` user_name = '${this.user_name}',`;
     if(this.user_phone_number) Query += `user_phone_number = ${this.user_phone_number},`;
     if(this.user_email) Query += ` user_email = '${this.user_email}',`;
     if(this.user_password) Query += ` user_password = '${this.user_password}',`;
     if(this.user_address) Query += ` user_address = '${this.user_address}',`;
     if(this.user_city) Query += ` user_city='${this.user_city}',`;
     if(this.user_state) Query += ` user_state='${this.user_state}',`;
     if(this.user_pincode) Query += ` user_pincode=${this.user_pincode},`;
     Query+=`emp_id = ${this.emp_id} `
     Query+=` WHERE user_id=${this.user_id}`;
          sql.query(Query, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               else {
                    result(null, res);
                    return;
               }
          });
     }

     //fetching the user data by id
     static findById(user_id,result) {
          sql.query(`SELECT * FROM User WHERE user_id=${user_id}`, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               else {
                    result(null, res);
                    return;
               }
          });
     }
}









  module.exports=User;
