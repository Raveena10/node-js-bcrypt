const express = require("express");
const bcrypt = require("bcrypt")
const signupModel = require("../models/signup");
var jwt = require('jsonwebtoken');

let router = express.Router();

router.post("/signup", async(req, res) => {
  const user = req.body;
  const isemailExists=await signupModel.findOne({email:user.email})
  if(isemailExists){
    return res.status(400).json({ data: "Email already exists.." });
  }

  bcrypt.hash(user.password, 10, function(err, hash) {
    // Store hash in your password DB.
    const userOne = new signupModel({
      firstName: user.firstName,
      password: hash,
      email: user.email,
    });
    userOne
    .save()
    .then((data) => {
      console.log("DATA SAVED : ", data);
      return res.status(200).json({ data: "data stored.." });
    })
    .catch((e) => {
      return res.status(201).json({ data: "Error : ", e });
    });
  });
});
router.post("/signin", async(req, res) => {
  const user = req.body;
  if(!user.email && !user.password){
    return res.status(201).json({ data: "Kindly fill the details first" });
  }
  const isemailExists=await signupModel.findOne({email:user.email})
  if(isemailExists){
    bcrypt.compare(user.password, isemailExists.password).then(function(result) {
      if(result == true){
        var token = jwt.sign({ _id: isemailExists._id }, 'my-token');
        return res.status(200).json({ data: "Login sucessfully.." ,token});
      }
      else{
        return res.status(400).json({ data: "user email/Password incorrect.." });
      }
  });
  }
  else{
    return res.status(400).json({ data: "user email incorrect.." });
  }
});
router.post("/extra", async(req, res) => {

});
  module.exports = router;
