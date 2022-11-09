const sql  = require('./db.js');


if (process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

class Courier{
    constructor(body){
        this.courier_id= body.courier_id;
        this.courier_weight= body.courier_weight || body.courier_weight_greater_equal_to;
        this.courier_cost= (this.courier_weight)?process.env.COSTPERUNIT * this.courier_weight :this.courier_weight;
        this.courier_authorizer=body.id;
        this.from_name= body.from_name;
        this.from_email= body.from_email;
        this.from_phone_number= body.from_phone_number;
        this.from_address= body.from_address;
        this.from_city= body.from_city;
        this.from_state= body.from_state;
        this.from_pincode= body.from_pincode;
        this.to_name= body.to_name;
        this.to_email= body.to_email;
        this.to_phone_number= body.to_phone_number;
        this.to_address= body.to_address;
        this.to_city= body.to_city;
        this.to_state= body.to_state;
        this.to_pincode= body.to_pincode;
        this.courier_status= body.courier_status;
        this.from_date= body.from_date;
        this.to_date= body.to_date;
        this.couriers_placed_from_this_date=body.couriers_placed_from_this_date,
        this.couriers_placed_until_this__date= body.couriers_placed_until_this__date,
        this.couriers_delivered_from_this_date=body.couriers_delivered_from_this_date,
        this.couriers_delivered_until_this_date= body.couriers_delivered_until_this_date
    }

    create(result){
      let Query = `INSERT INTO 
      Courier (courier_weight,courier_cost, courier_authorizer, courier_status, from_name, from_email, from_phone_number,from_address, from_city, from_state, from_pincode, to_name, to_email,to_phone_number,to_address,to_city,to_state,to_pincode )
      VALUES(${this.courier_weight},${this.courier_cost},${this.courier_authorizer},'${this.courier_status}','${this.from_name}','${this.from_email}', ${this.from_phone_number}, '${this.from_address}' ,'${this.from_city}' ,'${this.from_state}' , ${this.from_pincode}, '${this.to_name}','${this.to_email}', ${this.to_phone_number}, '${this.to_address}' ,'${this.to_city}' ,'${this.to_state}' , ${this.to_pincode} );`

      sql.query(Query, (err, data)=>{
        if(err){
          result(err,null);
          return;
        }
        else{
          result(null,data);
          return;
        }
      })
      
    }

    static getCourierDataById(id,result){
       sql.query(`SELECT * FROM Courier WHERE courier_id=${id}`,(err,res)=>{
          if(err){
            result(err,null);
            return;
          }
          else{
            result(null,res);
            return;
          }
       })
    }

   static  getCourierDataByFromPhoneNumber(from_phone_number,result){
      sql.query(`SELECT courier_id,courier_weight, courier_created_date, courier_cost, from_name,from_phone_number,from_email,from_address,from_city,from_pincode,from_state,to_name,to_phone_number,to_email,to_address,to_city,to_pincode,to_state,courier_status FROM Courier WHERE from_phone_number=${from_phone_number}`,(err,res)=>{
          if(err){
            result(err,null);
            return;
          }
          else{
            result(null,res);
            return;
          }
         });
          
   }

   static  getCourierDataByToPhoneNumber(to_phone_number,result){
      sql.query(`SELECT courier_id,courier_weight,courier_created_date, courier_cost, from_name,from_phone_number,from_email,from_address,from_city,from_pincode,from_state,to_name,to_phone_number,to_email,to_address,to_city,to_pincode,to_state,courier_status FROM Courier WHERE to_phone_number=${to_phone_number}`,(err,res)=>{
          if(err){
            result(err,null);
            return;
          }
          else{
            result(null,res);
            return;
          }
      });
   }
    
    static updatePhoneNumber(old_phone_number,new_phone_number,result){
      console.log(old_phone_number,new_phone_number);
      const Query=
      `UPDATE Courier SET from_phone_number=${new_phone_number} WHERE from_phone_number=${old_phone_number};
      UPDATE Courier SET to_phone_number=${new_phone_number} WHERE to_phone_number=${old_phone_number};`; 
      sql.query(Query, (err, data)=>{
         if(err){ result(err,null); return;}
         else { result(null, data); return;}
      });

    }

    filterCourierData(result){
       let Query="SELECT * FROM Courier WHERE ";
       
       if(this.courier_id) Query+=`courier_id = ${this.courier_id} AND `
       if(this.from_phone_number) Query+=`from_phone_number= ${this.from_phone_number} AND `
       if(this.to_phone_number) Query+=`to_phone_number = ${this.to_phone_number} AND `
       if(this.courier_status) Query+=`courier_status = '${this.courier_status}' AND `
       if(this.from_pincode) Query+=`from_pincode = ${this.from_pincode} AND `
       if(this.to_pincode) Query+=`to_pincode = ${this.to_pincode } AND `
       if(this.from_city) Query+=`from_city like '${this.from_city}%' AND `
       if(this.from_state) Query+=`from_state like '${this.from_state }%' AND `
       if(this.to_city) Query+=`to_city like '${this.to_city}%' AND `
       if(this.to_state) Query+=`from_state like '${this.to_state}%' AND `
       if(this.couriers_placed_from_this_date) Query+=`courier_created_time>= '${this.couriers_placed_from_this_date}' AND `
       if(this.couriers_placed_until_this__date) Query+=`courier_created_time<= '${this.couriers_placed_until_this__date}' AND `
       if(this.couriers_delivered_from_this_date) Query+=`courier_created_time>= '${this.couriers_delivered_from_this_date}' AND `
       if(this.couriers_delivered_until_this__date) Query+=` courier_created_time<= '${this.couriers_placed_until_this__date}' AND `
       Query=Query.slice(0,-4);
       console.log(Query);


       sql.query(Query, (err, data)=>{
                 if(err){ result(err,null); return;}
                 else { result(null, data); return;}
      });
     }


     static updateCourierStatus(id,status,result){
      console.log(id,status);
        let Query =`UPDATE Courier SET courier_status = '${status}' WHERE courier_id = ${id};`
        console.log(Query);
        sql.query(Query,(err,data)=>{
          if(err){ result(err,null); return;}
          else {result(null, data); return; }
        })
     }




    


}

module.exports=Courier;