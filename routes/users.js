const express = require("express");
const verify = require("../verifyToken")
const User = require("../models/User");
const Book = require("../models/Book");
const router = express.Router();


// router.get("/", async (req, res) => {
//     res.send("Hoşgeldiniz.")
// })

router.get("/", async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username })
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update User  
router.put("/:id", verify, async (req, res) => {
    // req.user.id === this is coming from verifyToken (req.user)
    // allow if user id is equal or is admin
    if (req.user.id === req.params.id || req.user.isAdmin) {
        // first we have to check if the password has changed
        // if (req.body.password) {
        //     const salt = await bcrypt.genSalt(10);
        //     const hashedPassword = await bcrypt.hash(formData.password, salt);
        //     req.body.password = hashedPassword
        // }

        try {
            // firstly we can find this user (req.params.id)
            // and then we can set new properties  // we send all body 
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true }) // after setting new user
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("You can update only your account ") // 403|forbidden
    }
})

// Delete User  
router.delete("/:id", verify, async (req, res) => {
    // req.user.id === this is coming from verifyToken (req.user)
    // allow if user id is equal or is admin
    if (req.user.id === req.params.id || req.user.isAdmin) {

        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("You can update only your account ") // 403|forbidden
    }
})

// Get User  
router.get("/find/:id", async (req, res) => {
    // no necessary verify --> everyone can see other's profiles
    try {
        const user = await User.findById(req.params.id)

        const { password, ...info } = user._doc;

        res.status(200).json(info)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET Friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        )
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture })
        })
        res.status(200).json(friendList)
    } catch (error) {
        res.status(500).json(error)
    }
})

// ADD BOOK
router.put("/:id/book", verify, async (req, res) => {
    console.log("req.body.bookId", req.body.bookId)
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const user = await User.findById(req.params.id);
            let sonuc = false;
            user.bookShelf?.map((item, i) => {
                if (item.bookId === req.body.bookId) {
                    sonuc = true
                }
            })
            if (sonuc === false) {
                await user.updateOne({ $push: { bookShelf: req.body } })
                res.status(200).json("Book has been added");
            } else {
                const updatedBook = await User.findOneAndUpdate({ "bookShelf.bookId": req.body.bookId, _id: req.params.id }, {
                    $set: { "bookShelf.$": req.body },
                }, { new: true })
                res.status(200).json(updatedBook)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You can update only your account ") // 403|forbidden
    }
})

// FOLLOW USER
router.put("/:id/follow", async (req, res) => {
    console.log("req.body.userıd", req.body.userId);
    console.log("req.params.id", req.params.id);
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json("User has been followed")
            } else {
                res.status(403).json("You already follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You can't follow yourself")
    }
})

// UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json("User has been unfollowed")
            } else {
                res.status(403).json("You don't follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You can't unfollow yourself")
    }
})

// if we're not admin there is no sense to see all users.
// GET ALL User
router.get("/", verify, async (req, res) => { // "/?new=true" --> query
    const query = req.query.new;
    // req.user.id === this is coming from verifyToken (req.user)
    // allow if user id is equal or is admin
    if (req.user.isAdmin) {

        try {
            // only get last 10 New User ---> if no query we're gonna fetch all users
            // sort({_id:-1}) --> it's provide to get latest datas
            const users = query ? await User.find().sort({ _id: -1 }).limit(10) : await User.find();
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("You are not allowed to see all users! ")
    }
})

// GET BOOKS OR USERS BY SEARCH
router.get("/get/all/", async (req, res) => {
    const { q } = req.query
    try {
        const users = await User.find({ $or: [{ fullname: { $regex: q, $options: 'i' } }] })
        const books = await Book.find({ $or: [{ book_name: { $regex: q, $options: 'i' } }] })

        const allDatas = users.concat(...books)
        q ? res.status(200).json(allDatas.slice(0, 10)) : "";
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET BOOKS BY SEARCH
router.get("/get/all/", async (req, res) => {
    const { q } = req.query
    try {
        const books = await Book.find({ $or: [{ book_name: { $regex: q, $options: 'i' } }] })
        
        q ? res.status(200).json(books.slice(0, 10)) : "";
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;