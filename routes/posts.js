const Post = require("../models/Post");
const User = require("../models/User")

const router = require("express").Router();

// CREATE A POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId = req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("The post has been updated")
        } else {
            res.status(403).json("You can update only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE A POST

// GET A POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER'S ALL PROFİLE POST
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET TİMELİNE POST
router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      const allPosts = [...userPosts, ...friendPosts]
      res.status(200).json(allPosts);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;