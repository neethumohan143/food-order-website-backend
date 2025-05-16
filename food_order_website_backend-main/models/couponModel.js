const { default: mongoose } = require("mongoose");


const couponSchema = new mongoose.Schema({
  coupon_code:{
    type:String,
    unique: true 
  },
  discount_percentage:Number,
  exp_date: Date,
  });
  

  const Coupon = mongoose.model('Coupon', couponSchema);

  module.exports=Coupon
