const express = require("express");
const router = express.Router();
const requirelogin = require("../middlewares/requirelogin");
const POST = require("../models/post");
const USER = require("../models/user");

router.post("/createpost", requirelogin, async (req, res) => {
  const { image, body } = req.body;
  let success = false;
  try {
    if (!image || !body) {
      return res
        .status(422)
        .json({ success, error: "Please fill all the entries" });
    }
    const newpost = await POST.create({
      body,
      image,
      postedBy: req.user,
    });
    success = true;
    return res.status(200).json({ success, msg: "Posted successfully" });
  } catch (error) {
    console.error(error.msg);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/fetchposts", requirelogin, async (req, res) => {
  try {
    //only all posts if user is not following anybody
    const user = await USER.findById(req.user)
    if(user.following.length==0)
    {
      const posts = await POST.find()
      .populate("postedBy", "_id name userName image")
      .populate("comments.postedBy", "_id userName").sort("-createdAt")
      return res.status(200).json(posts);
    }
    //only fetching posts of accounts that are followed by user
    const posts = await POST.find({ postedBy: { $in: user.following } })
      .populate("postedBy", "_id name userName image")
      .populate("comments.postedBy", "_id userName").sort("-createdAt")
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/myposts", requirelogin, async (req, res) => {
  try {
    const posts = await POST.find({ postedBy: req.user })
      .populate("comments.postedBy", "_id userName")
      .populate("postedBy", "_id userName").sort("-createdAt");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/like", requirelogin, async (req, res) => {
  try {
    const newpost = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id userName")
      .populate("postedBy", "_id userName image");
    res.status(200).json({ newpost, msg: "Liked Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/unlike", requirelogin, async (req, res) => {
  try {
    const newpost = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id userName")
      .populate("postedBy", "_id userName image");
    res.status(200).json({ newpost, msg: "UnLiked Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/comment", requirelogin, async (req, res) => {
  try {
    const comment = {
      comment: req.body.comment,
      postedBy: req.user,
    };
    const newpost = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id userName")
      .populate("postedBy", "_id userName image");
    res.status(200).json({ newpost, msg: "Comment posted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/deletecomment", requirelogin, async (req, res) => {
  try {
    const newpost = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { comments: req.body.comm },
      },
      {
        new: true,
      }
    )
      .populate("postedBy", "_id userName image")
      .populate("comments.postedBy", "_id userName");
    res.status(200).json({ newpost, msg: "Deleted comment successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/deletepost/:postId", requirelogin, async (req, res) => {
  try {
    const result = await POST.findById(req.params.postId);
    if (!result) {
      return res.status(422).json({ msg: "Post Does not exist" });
    }
    if (result.postedBy.toString() == req.user) {
      const post = await POST.findByIdAndDelete(req.params.postId);
      res.status(200).json({ post, msg: "Post Deleted successfully" });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = router;
