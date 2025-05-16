const Restaurant = require("../models/restaurantsModel");
const { imageUpload } = require("../utils/imageUpload");

const getAllRestuarants = async (req, res) => {
   const restaurants= await Restaurant.find(req.query).exec();
   res.json(restaurants)
  }

const getRestuarantsbyid= async (req, res) => {
    const restaurants= await Restaurant.findById(req.params.restaurantsid).exec();
    res.json(restaurants)
  }
  
 const addRestuarants = async (req, res) => {
  let imageUrl;
  if(req.file){
    imageUrl=await imageUpload(req.file.path);
 }
    const data = req.body
    const restaurants = new Restaurant({...data,
      image:imageUrl
    })
    await restaurants.save();
    res.json(restaurants)
  }
 
 const updateRestuarants = async (req, res) => {
  if(req.file){
    let imageUrl=await imageUpload(req.file.path);
     req.body.image=imageUrl;
 }
   const updaterestaurants = await Restaurant.findByIdAndUpdate(req.params.restaurantsid, req.body, {new:true})
   res.json(updaterestaurants)
  }
  
 const deleteRestuarants = async (req, res) => {
    await  Restaurant.findByIdAndDelete(req.params.restaurantsid)
    res.send('Delete Successfully')
  }
  
  module.exports={
    getAllRestuarants,
    getRestuarantsbyid,
    addRestuarants,
    updateRestuarants,
    deleteRestuarants
  }