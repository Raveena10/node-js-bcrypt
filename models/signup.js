const mongoose = require("mongoose");
const { stringify } = require("querystring");

let mySchema = mongoose.Schema;

//define schema
let mySignupSchema = new mySchema({
  firstName: { type: String, required: [true, "first name is required.."] },
  password: String,
  email: String,
});

const tableName = "registration";

let signupData = mongoose.model(tableName, mySignupSchema);

module.exports = signupData;
