const express = require("express");
const router = express.Router();
const requirelogin = require("../middlewares/requirelogin");
const POST = require("../models/post");

router.post("/createpost", requirelogin, async (req, res) => {
  const { image, body } = req.body;
  let success = false;
  try {
    if (!image || !body) {
      return res.status(422).json({ success, error: "Please fill all the entries" });
    }
    const newpost = await POST.create({
      body,
      image,
      postedBy: req.user
    });
    success=true;
    return res.status(200).json({ success, msg: "Posted successfully" });
  } catch (error) {
    console.error(error.msg);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/fetchposts",requirelogin,async (req,res)=>{
  try{
    const posts= await POST.find().populate("postedBy","_id name userName");
    res.status(200).json(posts);
  }
  catch(error)
  {
    res.status(500).json({error:"Internal Server Error"})
  }

})

router.get("/myposts",requirelogin,async(req,res)=>{
  try{
    const posts =await POST.find({postedBy:req.user})
    res.status(200).json(posts);
  }
  catch(error)
  {
  res.status(500).json({error:"Internal Server Error"});
  }
})

module.exports = router;