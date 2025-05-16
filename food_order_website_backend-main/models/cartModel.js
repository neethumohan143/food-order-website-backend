const { default: mongoose } = require("mongoose");
const Menu = require("./menuModel");


const cartSchema = new mongoose.Schema({
   user_id:{
    type: mongoose.ObjectId,
    ref: "User"
   },
   cart_items:[
    {
        menu_id:{
            type: mongoose.ObjectId,
            ref: "Menu"
        },
        quantity:Number
    }
   ],
   total_amount:Number,
   gst_amount:Number,
   discount:Number
  });

  cartSchema.pre('save',async function (next) {
    let total =0;
    for(let item of this.cart_items){
        const menuItem = await Menu.findById(item.menu_id);
        if(menuItem){
            total +=menuItem.price * item.quantity
        }
    }
    this.total_amount = total;
    this.gst_amount = (total*18/100)
    this.discount =0;
    next();
  })

  const Cart = mongoose.model('Cart', cartSchema);

  module.exports=Cart
