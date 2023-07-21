const express = require("express");
const router = express.Router();
const requirelogin = require('../middlewares/requirelogin');
const USER = require("../models/user");
const POST = require("../models/post")

router.get("/fetchdetails", requirelogin, async (req, res) => {
  try {
    const user = await USER.findById(req.user).select("-password");
    res.json({ user });
  } catch (error) {
    res.send(error);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const user = await USER.findById(req.params.userId).select("-password");
    if(!user)
    {
        return res.status(404);
    }
    const posts = await POST.find({postedBy:user._id}).populate("postedBy","_id userName").populate("comments.postedBy","_id userName")
    res.status(200).json({ user,posts});
  } catch (error) {
    res.send(error);
  }
});

router.put("/follow",requirelogin,async(req,res)=>{
  try{
  const user =await USER.findByIdAndUpdate(req.user,{
    $push:{following:req.body.followId}
  },{
    new:true
  })
  if(!user)
  {
    return res.status(422).json({msg:"User does not exist"})
  }
  const user2= await USER.findByIdAndUpdate(req.body.followId,{
    $push:{followers:req.user}
  },{
    new:true
  })
  if(!user2)
  {
    return res.status(422).json({msg:"User does not exist"})
  }
  res.status(200).json({msg:"Followed Successfully"})
}
catch(error)
{
  res.status(500).json({error})
}
})
router.put("/unfollow",requirelogin,async(req,res)=>{
  try{
  const user =await USER.findByIdAndUpdate(req.user,{
    $pull:{following:req.body.followId}
  },{
    new:true
  })
  if(!user)
  {
    return res.status(422).json({msg:"User does not exist"})
  }
  const user2= await USER.findByIdAndUpdate(req.body.followId,{
    $pull:{followers:req.user}
  },{
    new:true
  })
  if(!user2)
  {
    return res.status(422).json({msg:"User does not exist"})
  }
  res.status(200).json({msg:"Unfollowed Successfully"})
}
catch(error)
{
  res.status(500).json({error})
}
})
module.exports = router;
