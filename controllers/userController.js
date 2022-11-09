const User= require('../models/UserModel');
const Courier= require('../models/CourierModel');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const {userSignUpValidator,userLoginValidator,userUpdateProfileValidator}=require('../middlewareUtilityFunctions/validation');



exports.signUp= async (req,res,next)=>{

    //checking whether do we have data in the request body?..
    if(!req.body || Object.keys(req.body).length==0) return res.status(400).send("No body data");  
    
    //validating the request body...
    const {error,value} = userSignUpValidator(req.body);
    if(error) return res.send(error.details[0].message);
    console.log(error);

    //hashing the user_password...
    const newUserObject = new User(req.body);
    const hashedPassword= await bcrypt.hash(newUserObject.user_password,10);
    newUserObject.user_password=hashedPassword;

    //inserting in to the database...
    console.log(newUserObject);
    newUserObject.create((err,data)=>{
    console.log(newUserObject);
    console.log(err);
      if(err && err.code==='ER_DUP_ENTRY') 
      return res.status(500).json({
            message:'some user already registered on this phone number'
        });
        else 
        return res.status(200).json({
            "message": "signup successful",
            "id":data.insertId

        });
    });

    // res.send("user signup route");
    

}

exports.login= async (req,res,next)=>{  

    //checking whether do we have data in the request body ?...
    if(!req.body || Object.keys(req.body).length==0) return res.status(400).json({
        "message":"no body data"
    });

    // validating the request body....
    const {error} = userLoginValidator(req.body);
    console.log(error);
    if(error) return res.status(400).json(
    {
        "message":error.details[0].message
    });


  
   
    // finding whether the user is already signed up with this phone number..
    User.findByPhone(req.body.user_phone_number, async (err,data)=>{
            if(err){
                //something went wrong the sql query...
                res.status(500).json({
                    "message":"internal server error"
                });
            }
            else{
                console.log(data);
                // if you don't get any data, this means user haven't registered yet..
                if(!data[0]){
                   return res.status(400).json(
                    {
                        "message":"User Haven't Registered"
                    });
                
                }
                else{
                //user have registered before.., now comparing the password using bcrypt....
                    if( await bcrypt.compare(req.body.user_password,data[0].user_password)){
                        //user have sent valid credentials...
                        //signing the JWT token with secret key..
                        const token= jwt.sign({id:data[0].user_id},process.env.ACCESS_SECRET_TOKEN,{expiresIn:'10000s'})

                        //issuing the token to the user..
                        return res.status(200).header("auth-token", `bearer ${token}`).send({
                            "message":"login successful",
                        })

                        
                    }
                    else{
                      //user haven't sent valid credentials...
                       return res.status(400).json({
                            "message":"Invalid Credentials"
                        })
                          
                    }
                }
            }
    })

}

exports.updateProfile= async (req,res,next)=>{ 

    //checking whether do we have data in the request body...
    if(!req.body || Object.keys(req.body).length==0) return res.status(400).send("No body data");
    
    // validating the request body....
    const {error}=userUpdateProfileValidator(req.body);
    if(error)  return res.status(400).send(error.details[0].message);
    

    //creating the user object...
    const newUserObject = new User(req.body);
    console.log(newUserObject);
  
    if(newUserObject.user_password){
        const hashedPassword= await bcrypt.hash(newUserObject.user_password,10);
        console.log("1");
        newUserObject.user_password=hashedPassword;
     }

console.log(newUserObject)
    // get the user_mobile number by user id...
    User.findById(req.body.id,(err,data)=>{
        if(err){
            //something went wrong the sql query...
            console.log(err);
            return res.status(500).json({
                "message":"internal server error"
            });
        }
        else{
            console.log(data);
            const user_phone_number=data[0].user_phone_number;
            console.log(user_phone_number,newUserObject.user_phone_number);
            if(newUserObject.user_phone_number &&  user_phone_number!=newUserObject.user_phone_number){
                console.log("1");
                  Courier.updatePhoneNumber(user_phone_number,newUserObject.user_phone_number,(err1,data1)=>{
                    if(err){
                        //something went wrong the sql query..
                      
                        console.log(err1);
                        res.sendStatus(500);
                        return;
                    }

                  })
            }
            console.log("2");
            newUserObject.update((err2,data2)=>{
                if(err2){
                    //something went wrong the sql query..
                    return res.sendStatus(500);
                    console.log(err2);
                }
                else{
                    return res.json({
                        "message":"update successful"
                    })
                    
                }
             })
        }
    })
  
}

exports.getMyCourierData= (req,res,next)=>{
    User.findById(req.body.id,(err,data)=>{
       
        if(err){
            //something went wrong the sql query...
            console.log("1");
            console.log(err,data);
            return res.status(500).json({
                "message":"internal server error",
                "error1":err
            });
        }
        else{
        console.log('2',data);
            const user_phone_number=data[0].user_phone_number;
            const Cdata={};
           Courier.getCourierDataByFromPhoneNumber(user_phone_number,(err1,data1)=>{
            console.log('3');
            console.log(err1,data1);
                if(err1){
                    //something went wrong the sql query...
                    return res.status(500).json({
                        "message":"internal server error",
                        "err":err1
                    }); 
                }
                else{
                   Cdata["couriers_sent_from_phone_number"] =data1;
                }
            })

            Courier.getCourierDataByToPhoneNumber(user_phone_number,(err2,data2)=>{
            console.log('4');
            console.log(err2,data2);
                if(err2){
                    //something went wrong the sql query...
                   return res.status(500).json({
                        "message":"internal server error",
                        "err":err2
                    }); 
                }
                else{
                   Cdata["couriers_received_to_phone_number"] =data2;
                }
            })
            return res.status(200).send(Cdata);
        }
    })
  
}

exports.getMyProfile=async (req,res,next)=>{
    User.findById(req.body.id,(err,data)=>{
        // console.log(err,data);
        if(err){
           return res.sendStatus(500);
        }
        else{
           return res.status(200).json({
               "user_id":data[0].user_id,
               "user_name":data[0].user_name,
               "user_email":data[0].user_email,
               "user_phone_number": data[0].user_phone_number,
               "user_address":data[0].user_address,
               "user_city":data[0].user_city,
               "user_state":data[0].user_state,
               "user_pincode":data[0].user_pincode
   
           });
        }
      })
}


exports.forgotPassword=(req,res,next) => {
    res.send(res.send("Currently this feature is not allowed"));
}
