const jwt = require("jsonwebtoken");
const checkadmin = (req,res,next)=>{
    const { token } = req.cookies;
   if (!token) {
    return res.status(401).json({ success: false, message: "user not autherized" });
}
const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
if (!tokenVerified) {
    return res.status(401).json({ success: false, message: "user not autherized" });
}
if(tokenVerified.role !=="admin"){
    return res.status(401).json({ success: false, message: "user not autherized" });
}
next();
}

module.exports = {
    checkadmin
}