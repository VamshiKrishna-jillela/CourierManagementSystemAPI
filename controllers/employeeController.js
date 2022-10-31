
exports.signUp=async (req,res,next)=>{  
    res.send("employee signup route");
}

exports.login=async (req,res,next)=>{  
    res.send("employee login route");
}

exports.updateProfile=async (req,res,next)=>{  
    res.send("employee update profile route");
}

exports.createCourier=async (req,res,next)=>{  
    res.send("employee courier creation route");
}

exports.filterCourierData=async (req,res,next)=>{
    res.send("employee filter courier route");
}

exports.updateCourierStatus=async (req,res,next)=>{
    res.send(" employee update courier status route");
}