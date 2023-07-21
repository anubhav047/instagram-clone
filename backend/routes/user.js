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

module.exports = router;
