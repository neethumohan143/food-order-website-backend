const Address = require("../models/addressModel");

const getAllAddress = async (req, res) => {
    const address= await Address.find(req.query).exec();
    res.json(address)

  }

const getAddressbyid=async (req, res) => {
    const address= await Address.findById(req.params.addressid).exec();
    res.json(address)
  }
  
 const addAddress = async (req, res) => {
    const data = req.body
    const address = new Address(data)
    await address.save();
    res.json(address)

  }
 
 const updateAddress = async (req, res) => {
    const updateaddress = await Address.findByIdAndUpdate(req.params.addressid, req.body, {new:true})
   res.json(updateaddress)

  }
  
 const deleteAddress = async (req, res) => {
    await  Address.findByIdAndDelete(req.params.addressid)
    res.send('Delete Successfully')
  }

  module.exports={
    getAllAddress,
    getAddressbyid,
    addAddress,
    updateAddress,
    deleteAddress
  }