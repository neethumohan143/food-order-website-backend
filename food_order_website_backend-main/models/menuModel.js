const { default: mongoose } = require("mongoose");


const menuSchema = new mongoose.Schema({
    name: String,
    restaurant_id: {
        type:mongoose.ObjectId,
        ref: "Restaurant"
    },
    image:String,
    price: Number
  });
  

  const Menu = mongoose.model('Menu', menuSchema);

  module.exports=Menu
