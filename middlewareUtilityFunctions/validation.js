const joi=require('joi');
// const joiDate=require('joi-date');

function userSignUpValidator(body){

    const schema= joi.object({
        user_name:joi.string().min(3).max(250).pattern(/^[a-zA-Z ]+$/,'alphabets ').required(),
        user_email:joi.string().email().min(6).max(250).required(),
        user_password:joi.string().min(8).max(25).required().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'atleast one letter, one number and one special character'),
        user_phone_number:joi.string().length(10).pattern(/^[0-9]*$/,'(10 digits)').required(),
        user_city:joi.string().min(6).max(25).required().pattern(/^[a-zA-Z ]+$/,'alphabets'),
        user_pincode:joi.string().length(6).pattern(/^[0-9]+$/,'(6 digits)').required(),
        user_address:joi.string().min(6).max(100).required(),
        user_retype_password:joi.ref('user_password'),
        user_state:joi.string().min(6).max(25).required().pattern(/^[a-zA-Z ]+$/,'alphabets')
        
    })


    return schema.validate(body);
   
}



function userLoginValidator(body){
    const schema= joi.object({
        user_phone_number:joi.string().pattern(/^[0-9]*$/,'(10 digits)').length(10).required(),
        user_password:joi.string().min(8).max(25).required().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'atleast one letter, one number and one special character'),
        user_retype_password:joi.ref('user_password'),
    })

    return schema.validate(body);

}




function userUpdateProfileValidator(body){
    const schema= joi.object({
        id:joi.number().integer(),  
        user_name:joi.string().min(3).max(255).pattern(/^[a-zA-Z ]+$/,'alphabets '),
        user_email:joi.string().email().min(6).max(255),
        user_password:joi.string().min(8).max(25).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'atleast one letter, one number and one special character'),
        user_phone_number:joi.string().length(10).pattern(/^[0-9]*$/,'(10 digits) '),
        user_city:joi.string().min(6).max(25).pattern(/^[a-zA-Z ]+$/,'alphabets'),
        user_pincode:joi.string().length(6).pattern(/^[0-9]+$/,'(6 digits)'),
        user_address:joi.string().min(6).max(100),
        user_retype_password:joi.ref('user_password'),
        user_state:joi.string().min(6).max(25).pattern(/^[a-zA-Z ]+$/,'alphabets'),

    })
    return schema.validate(body);
}

function userIdValidator(body){
      const schema=joi.object({
        user_id:joi.number().positive().greater(1000000).required().less(10000000)
      })
      schema.validate(body);
}

function employeeSignUpValidator(body){
    const schema= joi.object({
        emp_name:joi.string().min(3).max(255).pattern(/^[a-zA-Z ]+$/,'alphabets ').required(),
        emp_email:joi.string().email().min(6).max(255).required(),
        emp_password:joi.string().min(8).max(25).required().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'atleast one letter, one number and one special character'),
        emp_phone_number:joi.string().length(10).pattern(/^[0-9]*$/,'(10 digits)').required(),
        emp_city:joi.string().min(6).max(25).required().pattern(/^[a-zA-Z ]+$/,'alphabets'),
        emp_pincode:joi.string().length(6).pattern(/^[0-9]+$/,'(6 digits)').required(),
        emp_address:joi.string().min(6).max(100).required(),
        emp_retype_password:joi.ref('emp_password'),
        emp_state:joi.string().min(6).max(25).required().pattern(/^[a-zA-Z ]+$/,'alphabets')

    })

    return schema.validate(body);
}

function employeeLoginValidator(body){
    const schema= joi.object({
        emp_phone_number:joi.string().pattern(/^[0-9]*$/,'(10 digits)').length(10).required(),
        emp_password:joi.string().min(8).max(25).required().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'atleast one letter, one number and one special character'),
        emp_retype_password:joi.ref('emp_password'),
    })
    
     return schema.validate(body);
}


function employeeUpdateProfileValidator(body){

    const schema= joi.object({
        id:joi.number().integer(),
        emp_name:joi.string().min(3).max(255).pattern(/^[a-zA-Z ]+$/,'alphabets '),
        emp_email:joi.string().email().min(6).max(255) ,
        emp_password:joi.string().min(8).max(25) .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'atleast one letter, one number and one special character'),
        emp_phone_number:joi.string().length(10).pattern(/^[0-9]*$/,'(10 digits)') ,
        emp_city:joi.string().min(6).max(25) .pattern(/^[a-zA-Z ]+$/,'alphabets'),
        emp_pincode:joi.string().length(6).pattern(/^[0-9]+$/,'(6 digits)') ,
        emp_address:joi.string().min(6).max(100),
        emp_retype_password:joi.ref('emp_password'),
        emp_state:joi.string().min(6).max(25) .pattern(/^[a-zA-Z ]+$/,'alphabets'),
        emp_bank_name:joi.string().min(3).max(255).pattern(/^[a-zA-Z ]+$/) ,
        emp_bank_account_number:joi.string().min(9).max(255) .pattern(/^[0-9]+$/),
        retype_emp_bank_account_number:joi.ref('emp_bank_account_number'),
        emp_bank_ifsc_code:joi.string().min(9).alphanum() 

    })

    return schema.validate(body);

}

function createCourierValidator(body){
    const schema = joi.object({
        id:joi.number().integer(),
        courier_weight:joi.number().required().max(5000).required(), 
        from_name:joi.string().min(3).max(255).pattern(/^[a-zA-Z ]+$/,'alphabets ').required(),
        from_phone_number:joi.string().length(10).pattern(/^[0-9]+$/,'(10 digits) ').required(),
        from_email:joi.string().email().min(6).max(255).required(),
        from_address:joi.string().min(6).max(100).required(),
        from_pincode:joi.string().length(6).pattern(/^[0-9]+$/,'(6 digits)').required(),
        from_city:joi.string().min(6).max(25).pattern(/^[a-zA-Z ]+$/,'alphabets ').required(),
        from_state:joi.string().min(6).max(25).pattern(/^[a-zA-Z ]+$/,'alphabets ').required(),
        to_name:joi.string().min(3).max(255).pattern(/^[a-zA-Z ]+$/,'alphabets ').required(),
        to_phone_number:joi.string().length(10).pattern(/^[0-9]+$/,'(10 digits) ').required() ,
        to_email:joi.string().email().min(6).max(255).required(),
        to_address:joi.string().min(6).max(100).required(),
        to_pincode:joi.string().length(6).pattern(/^[0-9]+$/,'(6 digits)').required(),
        to_city:joi.string().min(6).max(25).pattern(/^[a-zA-Z ]+$/,'alphabets ').required(),
        to_state:joi.string().min(6).max(25).pattern(/^[a-zA-Z ]+$/,'alphabets ').required(),
        courier_status:joi.string().min(3).max(25).required().pattern(/^[a-zA-Z ]+$/,'(alphabets)')


    });
    return schema.validate(body);
}

function filterCourierData(body){
    const schema=joi.object({
       id:joi.number().integer(),
       courier_id:joi.number().integer().positive().greater(10000000).less(100000000),
       courier_weight_greater_equal_to:joi.number().max(5000),
       from_name:joi.string().min(1).max(255).pattern(/^[a-zA-Z ]+$/,'alphabets '),
       to_name:joi.string().min(1).max(255).pattern(/^[a-zA-Z ]+$/,'alphabets '),
       from_phone_number:joi.string().pattern(/^[0-9]+$/,'(digits) '),
       from_email:joi.string().email().min(6).max(255),
       to_email:joi.string().email().min(6).max(255),
       to_phone_number:joi.string().pattern(/^[0-9]+$/,'(digits) '),
       to_pincode:joi.string().length(6).pattern(/^[0-9]+$/,'(6 digits)'),
       from_pincode:joi.string().length(6).pattern(/^[0-9]+$/,'(6 digits)'),
       from_city:joi.string().min(1).max(25).pattern(/^[a-zA-Z ]+$/,'(alphabets)'),
       to_city:joi.string().min(1).max(25).pattern(/^[a-zA-Z ]+$/,'(alphabets)'),
       from_state:joi.string().min(1).max(25).pattern(/^[a-zA-Z ]+$/,'alphabets '),
       to_state:joi.string().min(1).max(25).pattern(/^[a-zA-Z ]+$/,'alphabets '),
       couriers_placed_from_this_date:joi.date().max('now'),
       couriers_placed_until_this__date:joi.date().max('now'),
       couriers_delivered_from_this_date:joi.date().max('now'),
       couriers_delivered_until_this_date:joi.date().max('now')

    });

   return schema.validate(body);

}

function updateCourierStatusValidator(body){ 
    const schema = joi.object({
       id:joi.number().integer(),
       courier_id:joi.number().integer().positive().greater(100000000).less(1000000000).required(),
       courier_status:joi.string().min(3).max(25).required()
       
    })
    return schema.validate(body);
}

function publicValidator(body){
   const schema =joi.object({
    courier_id:joi.number().integer().positive().greater(100000000).less(1000000000).required()
   })
   return schema.validate(body);
}


module.exports={userSignUpValidator,userIdValidator,userLoginValidator,userUpdateProfileValidator,employeeLoginValidator,employeeSignUpValidator,employeeUpdateProfileValidator,createCourierValidator,updateCourierStatusValidator,filterCourierData,publicValidator}
