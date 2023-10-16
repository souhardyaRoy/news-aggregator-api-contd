const jwt = require("jsonwebtoken");
const User = require('../model/User.schema')

const verifyToken = (req, res,next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.PASSWORD_HASH,
      (err, decodeVal) => {
        if (err) {
            return res.status(401).json({message:"you are an unauthorized user, please valid the token"})
        }else{
            User.findOne({
                email: decodeVal.email
            }).then(user => {
                req.user = user;
                req.message = "Found the user successfully";
                next();
            }).catch(err => {
                req.user = undefined;
                req.message = "Some error while finding the user";
                next();
            });
            
        }
      }
    );
  } else {
    return res.status(401).json({message:"auth header not found"})
  }
};

module.exports = {verifyToken}