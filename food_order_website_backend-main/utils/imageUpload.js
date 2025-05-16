const { cloudinaryInstance } = require("../config/cloudinaryConfig");

const imageUpload = async(path)=>{
    try{
        const uploadresult =  await cloudinaryInstance.uploader.upload(path)
        return uploadresult.url;
    }catch(e){
        next(e)
    }
}

module.exports={imageUpload}