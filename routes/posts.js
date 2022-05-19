const Post = require("../models/Post");

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

        if(post.userId = req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("The post has been updated")
        }else{
            res.status(403).json("You can update only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE A POST

// GET A POST
router.get("/:id", async (req,res)=> {
    try {
        const post = await Post.findById(req.params.id)

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET TİMELİNE POST

module.exports = router;