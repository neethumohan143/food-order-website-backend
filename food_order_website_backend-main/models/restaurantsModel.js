const { default: mongoose } = require("mongoose");


const restaurantSchema = new mongoose.Schema({
    name: String,
    location: String,
    image: String
  });
  

  const Restaurant = mongoose.model('Restaurant', restaurantSchema);

  module.exports=Restaurant
