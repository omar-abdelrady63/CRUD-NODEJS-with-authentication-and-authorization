const AppError = require('../utilities/AppError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const jwtSign = util.promisify(jwt.sign);

const signup = async (req , res) => {
    const body = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const user = await User.create({
        ...body,
        password: hashedPassword
    })
    res.status(201).json({
        status : "success",
        message : "User created successfully",
        user
    })
}


const login = async (req,res)=>{
    const body = req.body
    const user = await User.findOne({email:body.email})
    if(!user){
        throw new AppError("Invalid email or password",400)
    }
    const isPasswordCorrect = await bcrypt.compare(body.password,user.password)
    if(!isPasswordCorrect){
        throw new AppError("Invalid email or password",400)
    }
    const jwtSecret= process.env.JWT_SECRET
    const expirtime=process.env.JWT_EXPIRTIME
    const token = await jwtSign({sub:user._id},jwtSecret,{expiresIn:expirtime})

    res.status(200).json({
        status:"success",
        access_token:token,
        user
    })

}


module.exports={
    signup,
    login
}
