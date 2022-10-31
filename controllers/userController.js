exports.signUp=async (req,res,next)=>{  
    res.send("user signup route");

}
exports.login=async (req,res,next)=>{  
    res.send("user login route");
}

exports.updateProfile=async (req,res,next)=>{  
    res.send("user update profile route");
}

exports.getMyCourierData=async (req,res,next)=>{
    res.send("user filter route");
}
