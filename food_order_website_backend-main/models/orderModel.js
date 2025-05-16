const { default: mongoose } = require("mongoose");


const orderSchema = new mongoose.Schema({
   user_id:{
    type:mongoose.ObjectId,
    ref: "User"
   },
   total_amount: Number,
   discount:Number,
   gst_amount:Number,
   payment_completed:Boolean,
   address_id:{
    type:mongoose.ObjectId,
    ref:"Address"
   },
   cart_items:[{
    menu_id:{
        type:mongoose.ObjectId,
        ref: "Menu"
    },
    quantity:Number
   }]
  });
  

  const Order = mongoose.model('Order', orderSchema);

  module.exports=Order
