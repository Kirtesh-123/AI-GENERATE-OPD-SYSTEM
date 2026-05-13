const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);

  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:hash
  });

  await user.save();
  res.json({message:"User Registered"});
});

// LOGIN
router.post("/login", async (req,res)=>{
  const user = await User.findOne({email:req.body.email});

  if(!user) return res.json({message:"User not found"});

  const ok = await bcrypt.compare(req.body.password,user.password);
  if(!ok) return res.json({message:"Wrong password"});

  const token = jwt.sign({id:user._id},"SECRET");

  res.json({token});
});

module.exports = router;