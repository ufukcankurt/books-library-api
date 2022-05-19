const Post = require("../models/Post");

const router = require("express").Router();

// CREATE A POST
router.post("/", async (req, res)=> {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error)
    }
})


// UPDATE A POST
// DELETE A POST
// GET A POST
// GET TİMELİNE POST

module.exports = router;