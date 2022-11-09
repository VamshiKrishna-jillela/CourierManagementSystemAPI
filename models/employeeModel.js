const sql  = require('./db.js');

class Employee{
    constructor(body){
       this.emp_id= body.id;
       this.emp_name= body.emp_name;
       this.emp_phone_number= body.emp_phone_number;
       this.emp_email= body.emp_email;
       this.emp_password=body.emp_password;
       this.emp_address= body.emp_address;
       this.emp_city= body.emp_city;
       this.emp_pincode= body.emp_pincode;
       this.emp_state=body.emp_state;
    }

    create(result) {
        sql.query(`INSERT INTO 
        Employee(emp_name,emp_phone_number,emp_email,emp_password,emp_address, emp_city,emp_pincode,emp_state)
        values('${this.emp_name}',  ${this.emp_phone_number},  '${this.emp_email}',  '${this.emp_password}',  '${this.emp_address}',  '${this.emp_city}',  ${this.emp_pincode}, 
        '${this.emp_state}');`, (err, res) => {
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

    static findByPhone(emp_phone_number,result) {
        console.log(`emp ${emp_phone_number}`);
        sql.query(`SELECT emp_id,emp_phone_number, emp_password FROM Employee WHERE emp_phone_number = '${emp_phone_number}'`, (err, res) => {
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

    //updating the emp data by id
    update(result) {
        console.log(this);
        let Query=`UPDATE Employee SET `;
        if(this.emp_name) Query += ` emp_name = '${this.emp_name}',`;
        if(this.emp_phone_number) Query += `emp_phone_number = ${this.emp_phone_number},`;
        if(this.emp_email) Query += ` emp_email = '${this.emp_email}',`;
        if(this.emp_password) Query += ` emp_password = '${this.emp_password}',`;
        if(this.emp_address) Query += ` emp_address = '${this.emp_address}',`;
        if(this.emp_city) Query += ` emp_city='${this.emp_city}',`;
        if(this.emp_state) Query += ` emp_state='${this.emp_state}',`;
        if(this.emp_pincode) Query += ` emp_pincode=${this.emp_pincode},`;
        Query+=`emp_id = ${this.emp_id} `
        // Query=Query.slice(0,-1);
        console.log(Query);
        Query+=` WHERE emp_id=${this.emp_id}`;
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

    //fetching the emp data by id
    findById(result) {
        sql.query(`SELECT * FROM Employee WHERE emp_id=${this.emp_id}`, (err, res) => {
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

module.exports=Employee;