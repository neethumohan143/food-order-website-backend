require('dotenv').config()
const Order = require("../models/orderModel");
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');



const getAllOrder = async (req, res) => {
    const order= await Order.find(req.query).populate('user_id').populate({
      path: 'cart_items.menu_id',
      model: 'Menu'
  });
    res.json(order)
  }

const getOrderbyid=async (req, res) => {
    const order= await Order.findById(req.params.orderid).exec();
    res.json(order)
  }
  
 const addOrder = async (req, res) => {
    const data = req.body
    const order = new Order(data)
    await order.save();
    const userdetails = await order.populate('user_id')
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_ID, 
        pass: process.env.PASSWORD 
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ID, 
      to: userdetails.user_id.email,
      subject: 'Order Confirmation',
      text: `Thank you for your order! Your order number is ${order._id}. We will process your order shortly.`
    };

    await transporter.sendMail(mailOptions);
    res.json(order)

  }
 
 const updateOrder = async (req, res) => {
    const updateorder = await Order.findByIdAndUpdate(req.params.orderid, req.body, {new:true})
   res.json(updateorder)
  }
  
 const deleteOrder = async (req, res) => {
    await  Order.findByIdAndDelete(req.params.orderid)
    res.send('Delete Successfully')
  }

  const initOrder = async (req, res) => {
    const { total_amount } = req.body;
  
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const generateReceiptNumber = () => {
      const timestamp = Date.now(); 
      const randomNum = Math.floor(Math.random() * 100000); 
      return `receipt_order_${timestamp}_${randomNum}`;
    };
  
    const options = {
      amount: total_amount * 100,  // Razorpay expects amount in paise
      currency: 'INR',
      receipt: generateReceiptNumber(),
    };
  
    try {
      const order = await instance.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  module.exports={
    getAllOrder,
    getOrderbyid,
    addOrder,
    updateOrder,
    deleteOrder,
    initOrder
  }