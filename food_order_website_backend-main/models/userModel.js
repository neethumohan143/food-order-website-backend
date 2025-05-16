const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   name:String,
   email:String,
   password:String,
   confirm_password:String,
   mobile_number:String,
   image:String,
   role:{
      type: String,
      enum:["admin","user"],
      default:"user"
   }
  });

  const User = mongoose.model('User', userSchema);

  module.exports =User