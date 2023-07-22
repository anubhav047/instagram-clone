const express = require("express");
const router = express.Router();
const USER = require("../models/user");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  let success = false;
  const { name, userName, email, password } = req.body;
  if (!name || !userName || !email || !password) {
    return res
      .status(422)
      .json({ success, error: "Please enter all the entries" });
  }
  const alreadyuser = await USER.findOne({
    $or: [{ email: email }, { userName: userName }],
  });
  if (alreadyuser) {
    return res
      .status(422)
      .json({ success, error: "Username or Email already exists" });
  }
  try {
    const secPass = await bcrypt.hash(password, 10);
    const user = await USER.create({
      name,
      userName,
      email,
      password: secPass
    })
    if(user){
        success=true;
        return res.status(200).json({success,msg:"Account created successfully"});
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  let success=false;
  try{
    const {email,password}=req.body;
    if(!email||!password)
    {
      return res.status(422).json({success,error:"Please enter all the entries"})
    }
    const user=await USER.findOne({email:email})
    if(!user)
    {
      return res.status(422).json({success,error:"User does not exist"})
    }
    const passcomp=await bcrypt.compare(password,user.password)
    if(!passcomp)
    {
      return res.status(422).json({success,error:"Invalid Password"})
    }
    success=true;
    const token= await jwt.sign({_id:user.id},JWT_SECRET);
    return res.status(200).json({success,msg:"Logged in successfully",token})
  }
  catch(error)
  {
    console.error(error)
    return res.status(500).json({error:"Internal Server Error"})
  }
});

module.exports = router;
