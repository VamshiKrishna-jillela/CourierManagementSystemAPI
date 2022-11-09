const Employee= require('../models/employeeModel');
const Courier= require('../models/CourierModel');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const {employeeSignUpValidator,employeeLoginValidator,employeeUpdateProfileValidator,createCourierValidator,updateCourierStatusValidator,filterCourierData,}=require('../middlewareUtilityFunctions/validation');
const authorize= require('../middlewareUtilityFunctions/verifyToken');

exports.signUp=async (req,res,next)=>{  

   //checking whether do we have data in the request body?..
   if(!req.body || Object.keys(req.body).length==0) return res.status(400).send("No body data");  
    
   //validating the request body...
   const {error} = employeeSignUpValidator(req.body);
   if(error) return res.send(error.details[0].message);
   console.log(error);

   //hashing the user_password...
   const newEmpObject = new Employee(req.body);
   const hashedPassword= await bcrypt.hash(newEmpObject.emp_password,10);
   newEmpObject.emp_password=hashedPassword;

   //inserting in to the database...
   console.log(newEmpObject);
   newEmpObject.create((err,data)=>{
   console.log(newEmpObject);
   console.log(err);
     if(err && err.code==='ER_DUP_ENTRY') 
     return res.status(500).json({
           message:'some employee already registered on this phone number'
       });
       else 
       return res.status(200).json({
           "message": "signup successful",
           "id":data.insertId

       });
   });

   // res.send("user signup route");
   

}

exports.login=async (req,res,next)=>{  
     //checking whether do we have data in the request body ?...
     if(!req.body || Object.keys(req.body).length==0) return res.status(400).json({
        "message":"no body data"
    });
    console.log(req.body);
    // validating the request body....
    const {error} = employeeLoginValidator(req.body);
    console.log(error);
    if(error) return res.status(400).json(
    {
        "message":error.details[0].message
    });


  
   
    // finding whether the employee is already signed up with this phone number or not ?..
    Employee.findByPhone(req.body.emp_phone_number, async (err,data)=>{
            if(err){
                //something went wrong the sql query...
                res.status(500).json({
                    "message":"internal server error"
                });
            }
            else{
                console.log(data);
                // if you don't get any data, this means this employee haven't registered yet..
                if(!data[0]){
                   return res.status(400).json(
                    {
                        "message":"User Haven't Registered"
                    });
                
                }
                else{
                //employee have registered before.., now comparing the password using bcrypt....
                    if( await bcrypt.compare(req.body.emp_password,data[0].emp_password)){
                        //employee have sent valid credentials...
                        //signing the JWT token with secret key..
                        const token= jwt.sign({id:data[0].emp_id},process.env.ACCESS_SECRET_TOKEN,{expiresIn:'10000s'})

                        //issuing the token to the employee..
                        return res.status(200).header("auth-token", `bearer ${token}`).send({
                            "message":"login successful",
                        })
                    }
                    else{
                      //employee haven't sent valid credentials...
                       return res.status(400).json({
                            "message":"Invalid Credentials"
                        })
                          
                    }
                }
            }
    }) 
}

exports.updateProfile=async (req,res,next)=>{ 

    if(!req.body || Object.keys(req.body).length==0) return res.status(400).send(" No request body data");

    const {error} = employeeUpdateProfileValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    

     const newEmpObject= new Employee(req.body);
    console.log(newEmpObject);
     if(newEmpObject.emp_password){
        const hashedPassword= await bcrypt.hash(newEmpObject.emp_password,10);
        newEmpObject.emp_password=hashedPassword;
     }
     newEmpObject.update((err,data)=>{
        if(err)
        {
            console.log(err);
            return res.sendStatus(500);
           
        }
          
        else 
            return res.status(200).json({
                "message":"data updated successfully"
            });
                
     })
}

exports.createCourier=async (req,res,next)=>{ 
    if(!req.body || Object.keys(req.body).length==0) return res.status(400).send(" No request body data");

    const {error} = createCourierValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const newCourierObject = new Courier(req.body);
    newCourierObject.create((err,data)=>{
        if(err) return res.status(400).send(err);
        else return res.status(200).json({
            "message":"Courier Created Successfully",
            "courier_id":data[0].insertId
        });
    })

    
}

exports.filterCourierData=async (req,res,next)=>{
    if(!req.body || Object.keys(req.body).length==0) return res.status(400).send(" No request body data");

    const {error} = filterCourierData(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    console.log(req.body);
    const newCourierObject= new Courier(req.body);
    console.log(newCourierObject);
    newCourierObject.filterCourierData((err,data)=>{
       if(err) res.sendStatus(500);
       else res.status(200).json(data);
    });

    // res.send("employee filter courier route");
}

exports.updateCourierStatus=async (req,res,next)=>{
    const {error} = updateCourierStatusValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    Courier.updateCourierStatus (req.body.courier_id, req.body.courier_status,(err,data)=>{
        if(err) res.status(500).json(err);
        else res.status(200).json({
            "message":"Successfully Updated Courier Status",
            "courier_status":req.body.courier_status
        });
    });
}