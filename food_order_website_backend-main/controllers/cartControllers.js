const Cart = require("../models/cartModel");

const getAllCart = async (req, res) => {
    const cart= await Cart.find(req.query).populate('user_id').populate({
      path: 'cart_items.menu_id',model: 'Menu' 
  });
    res.json(cart)
  }

const getCartbyid=async (req, res) => {
    const cart= await Cart.findById(req.params.cartid).exec();
    res.json(cart)
  }
  
 const addCart = async (req, res) => {
    const data = req.body
    const cart = new Cart(data)
    await cart.save();
    res.json(cart)
  }
 
 const updateCart = async (req, res) => {
    const updatecart = await Cart.findByIdAndUpdate(req.params.cartid, req.body, {new:true})
    const updated = await updatecart.save();

    res.json(updated)
 
  }
  
 const deleteCart = async (req, res) => {
    await  Cart.findByIdAndDelete(req.params.cartid)
    res.send('Delete Successfully')
  }

  module.exports={
    getAllCart,
    getCartbyid,
    addCart,
    updateCart,
    deleteCart
  }