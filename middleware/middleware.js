var jwt = require('jsonwebtoken');
const signupModel = require("../models/signup");

module.exports = (req,res,next) => {
    const auth=req.header.authorization
    if(!auth){
        return res.status(409).json({ data: "Token not exist" });
    }
    const token = auth.replace("Bearer ","")
    jwt.verify(token, 'my-token', async function(err, decoded) {
        // err
        console.log("err",err)
        // decoded undefined
        console.log("decoded",decoded)
        if(err){
            return res.status(409).json({ data: err });
        }
        else{
            const id=decoded
            const isdataexists=await signupModel.findById(id)
            console.log("isdataexists",isdataexists)
            req.user = isdataexists
        }
    });
}