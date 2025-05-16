const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const login = async (req, res) => {
   const {email, password}=req.body;
   const user = await User.findOne({ email: email }).exec();
   if(!user){
    return res.status(404).send("User not found")
   }
   const passwordMatch =  bcrypt.compareSync(password,user.password)
   if(passwordMatch){
        const token = jwt.sign({ _id: user._id,email: user.email,role:user.role }, process.env.JWT_SECRET_KEY);
        res.cookie("token",token,{httpOnly:true,maxAge :1*60*60*1000, secure:true})
        res.status(200).json(
           {
            "status":true,
            "data":{
                "_id":user._id,
                "name":user.name,
                "email":user.email,
                "phone_number":user.phone_number,
                "role":user.role
            }
           }
        )
   }else{
    res.status(401).json({
        "status":false,
        "data":[]
       })
  }
  }

const logout = async (req, res) =>{
  try{
    res.clearCookie("token")
    res.send("Logout Success")
  }catch(e){
    console.log(e);
    next();
  }
}


  module.exports={
    login,
    logout
  }