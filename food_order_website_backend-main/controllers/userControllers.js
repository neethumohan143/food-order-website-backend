
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const { imageUpload } = require("../utils/imageUpload");
const saltRounds = 10;

const getAlluser = async (req, res) => {
    const user= await User.find().exec();
    const response = user.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number,
      role: user.role,
      image: user.image
    }));
    res.json(response)

  }

const getUserbyid=async (req, res) => {
    const user= await User.findById(req.params.userid).exec();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number,
      role: user.role,
      image: user.image
    })

  }
  
  const addUser = async (req, res) => {
    try {
      const { email, password, confirm_password, ...data } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (password !== confirm_password) {
        return res.status(401).json({ message: 'Password Mismatch' });
      }
      const hash = bcrypt.hashSync(password, saltRounds);
      const hashConfPas = bcrypt.hashSync(confirm_password, saltRounds);
      let imageUrl;
      if (req.file) {
        imageUrl = await imageUpload(req.file.path);
      }
      const user = new User({
        ...data,
        email, 
        password: hash,
        confirm_password: hashConfPas,
        image: imageUrl
      });
      await user.save();
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile_number: user.mobile_number,
        role: user.role,
        image: user.image
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
 
 const updateUser = async (req, res) => {
    if(req.file){
       let imageUrl=await imageUpload(req.file.path);
        req.body.image=imageUrl;
    }
    const updateuser = await User.findByIdAndUpdate(req.params.userid, req.body, {new:true})
    res.json(updateuser)
  }
  
 const deleteUser = async (req, res) => {
    await  User.findByIdAndDelete(req.params.userid)
    res.send('Delete Successfully')
  }

  module.exports={
        getAlluser,
        getUserbyid,
        addUser,
        updateUser,
        deleteUser,
  }