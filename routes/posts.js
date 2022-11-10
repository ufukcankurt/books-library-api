const Post = require("../models/Post");
const User = require("../models/User")
const Book = require("../models/Book")
const Comment = require("../models/Comment")
const verify = require("../verifyToken")

const router = require("express").Router();

// CREATE A POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    console.log("newPost", newPost);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        console.log(error);
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

        
        const obj = {};
        const user = await User.findById(post.userId);
        const { password, updatedAt, ...other } = user._doc
        const comments = await Comment.find({ postId: post._id });

        const commentsDetails = await Promise.all(
            comments.map(async (comment) => {
                const user = await User.findById(comment.userId);
                const { password, updatedAt, ...other } = user._doc
                const obj = {}
                obj.comment = comment;
                obj.user = other;
                return obj
            })
        )

        obj.post = post;
        obj.user = other;
        obj.comments = commentsDetails;

        if (post.type !== "post") {
            const book = await Book.findById(post.bookId);
            obj.book = book;
        }

        res.status(200).json(obj)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET USER'S ALL PROFİLE POST -- SEND ALL DATAS
router.get("/profile/getall/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });

        const allPost = await Promise.all(
            posts.map(async (post) => {

                const obj = {};
                const user = await User.findById(post.userId);
                const { password, updatedAt, ...other } = user._doc
                const comments = await Comment.find({ postId: post._id });

                const commentsDetails = await Promise.all(
                    comments.map(async (comment) => {
                        const user = await User.findById(comment.userId);
                        const { password, updatedAt, ...other } = user._doc
                        const obj = {}
                        obj.comment = comment;
                        obj.user = other;
                        return obj
                    })
                )

                obj.post = post;
                obj.user = other;
                obj.comments = commentsDetails;

                if (post.type !== "post") {
                    const book = await Book.findById(post.bookId);
                    obj.book = book;
                }

                return obj;
            })
        )

        res.status(200).json(allPost);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

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

// GET USER'S ALL PROFİLE POST -- SEND ALL DATAS
router.get("/timeline/getall/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        const allPosts = userPosts.concat(...friendPosts)
        //   const allPosts = [...userPosts, ...friendPosts]

        const allPostDetails = await Promise.all(
            allPosts.map(async (post) => {

                const obj = {};
                const user = await User.findById(post.userId);
                const { password, updatedAt, ...other } = user._doc
                const comments = await Comment.find({ postId: post._id });
                const commentsDetails = await Promise.all(
                    comments.map(async (comment) => {
                        const user = await User.findById(comment.userId);
                        const { password, updatedAt, ...other } = user._doc
                        const obj = {}
                        obj.comment = comment;
                        obj.user = other;
                        return obj
                    })
                )

                obj.post = post;
                obj.user = other;
                obj.comments = commentsDetails;

                if (post.type !== "post") {
                    const book = await Book.findById(post.bookId);
                    obj.book = book;
                }

                return obj;
            })
        )

        res.status(200).json(allPostDetails);
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
        const allPosts = userPosts.concat(...friendPosts)
        //   const allPosts = [...userPosts, ...friendPosts]
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LIKE POST
router.put("/like/:postId", verify, async (req, res) => {

    const postId = req.params.postId;
    const userId = req.user.id;

    try {
        await Post.findByIdAndUpdate(postId, {
            $addToSet: { likes: userId }
        })
        res.status(200).json("Post has been liked")
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }

})

// DISLIKE POST
router.put("/dislike/:postId", verify, async (req, res) => {

    const postId = req.params.postId;
    const userId = req.user.id;

    try {
        await Post.findByIdAndUpdate(postId, {
            $pull: { likes: userId }
        })
        res.status(200).json("Post has been disliked")
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }

})



module.exports = router;