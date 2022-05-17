const express = require("express");
const verify = require("../verifyToken")
const User = require("../models/User");
const router = express.Router();


// router.get("/", async (req, res) => {
//     res.send("Hoşgeldiniz.")
// })

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { ...other } = user._doc
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
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(formData.password, salt);
            req.body.password = hashedPassword
        }

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
            const users = query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("You are not allowed to see all users! ") 
    }
})


module.exports = router;