const router = require("express").Router();
const Courier= require("../models/CourierModel")
const {publicValidator}=require("../middlewareUtilityFunctions/validation")

router.get('/',(req,res,next)=>{
    // let courier_id= req.query.courier_id;
    let courier_id = req.query.courier_id;
    const {error}= publicValidator({"courier_id": courier_id});
    if(error) return res.status(400).send(error.details[0].message);

    Courier.getCourierDataById(courier_id,(err,data)=>{

        if(err) return res.status(500).send(err);
        else return res.status(200).json({
             "courier id": courier_id,
              "sender name": data[0].from_name,
             "receiver name": data[0].to_name,
            "courier status": data[0].courier_status
           
        })
    })
})

module.exports=router;