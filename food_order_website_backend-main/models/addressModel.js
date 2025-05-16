const { default: mongoose } = require("mongoose");


const addressSchema = new mongoose.Schema({
   user_id:{
       type: mongoose.ObjectId,
            ref: "User"
   },
   name:String,
   flat_no: String,
   street:String,
   land_mark:String,
   city:String,
   state:String
  });
  

  const Address = mongoose.model('Address', addressSchema);

  module.exports=Address
