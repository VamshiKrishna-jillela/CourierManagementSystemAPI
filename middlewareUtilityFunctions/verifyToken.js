const jwt=require('jsonwebtoken');

function authorize(req, res, next) {
   const authHeader =   req.headers['authorization']
   const token=authHeader && authHeader.split(' ')[1];
   // console.log(req.headers);
   if(!token) return res.sendStatus(401);

   jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded)=>{
    if(err) return res.sendStatus(403);
    console.log("validated................................................................");
    req.body.id=decoded.id;
    next();
   })


}

module.exports={authorize};