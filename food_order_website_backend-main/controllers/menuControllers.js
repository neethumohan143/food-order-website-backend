const Menu = require("../models/menuModel");
const { imageUpload } = require("../utils/imageUpload");

const getAllMenu = async (req, res) => {
    const menu= await Menu.find(req.query).populate('restaurant_id');
    res.json(menu)
  }

const getMenubyid=async (req, res) => {
    const menu= await Menu.findById(req.params.menuid).exec();
    res.json(menu)
  }
  
 const addMenu = async (req, res) => {
  let imageUrl;
  if(req.file){
    imageUrl= await imageUpload(req.file.path);
 }
    const data = req.body
    const menu = new Menu({
      ...data,
      image:imageUrl
    })
    await menu.save();
    res.json(menu)
  }
 
 const updateMenu = async (req, res) => {
  if(req.file){
    let imageUrl=await imageUpload(req.file.path);
     req.body.image=imageUrl;
 }
    const updatemenu = await Menu.findByIdAndUpdate(req.params.menuid, req.body, {new:true})
   res.json(updatemenu)
  }
  
 const deleteMenu = async (req, res) => {
    await  Menu.findByIdAndDelete(req.params.menuid)
    res.send('Delete Successfully')
  }

  module.exports={
    getAllMenu,
    getMenubyid,
    addMenu,
    updateMenu,
    deleteMenu
  }