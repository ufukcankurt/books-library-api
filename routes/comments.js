const verify = require("../verifyToken")
const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")

const router = require("express").Router();


// CREATE A COMMENT
router.post("/", verify, async (req, res) => {

    const newComment = new Comment({ ...req.body, userId: req.user.id });

    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

})

// DELETE A COMMENT
router.delete("/:id", verify, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const post = await Post.findById(comment.postId);

        if (comment.userId === req.user.id || post.userId === req.user.id) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted")
        } else {
            res.status(403).json("You can delete only your comment")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET COMMENTS OF A POST
router.get("/:postId", async (req, res) => {

    try {
        const comments = await Comment.find({ postId: req.params.postId });
        const obj = {};

        const newComments = await Promise.all(
            comments.map(async (comment)=> {
                const user = await User.findById(comment.userId);
                const { password, updatedAt, ...other } = user._doc
                obj.comment = comment;
                obj.user = other;
                return obj;
            })
        )

        res.status(200).json(newComments);
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router;