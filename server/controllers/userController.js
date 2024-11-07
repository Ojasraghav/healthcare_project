const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const User=require("../Models/userModel");
require ("dotenv").config();

const registerUser=asyncHandler(async (req,res)=>{
    const {email,first_name,last_name,age,blood_group,gender,phone_number,password}=req.body;

    // check if all fields are provided
    if(!email || !first_name || !last_name || !age || !blood_group || !gender || !phone_number || !password){
        res.status(400);
        throw new Error("please provides all fields");
    }

    // check if user already exists
    const userExists= await User.findOne({email});
    if(userExists){
        return res.status(400).json({message:"user already exists"});
    }

    // Hash the password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    // Create user
    const user=await User.create({
        email,first_name,last_name,age,blood_group,gender,phone_number,
        password:hashedPassword,
    });
    res.status(201).json({message:"User registered successfully",user});
});

module.exports={registerUser}