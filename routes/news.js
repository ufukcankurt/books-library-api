const express = require("express")
const verify = require("../verifyToken")
const News = require("../models/News");
const router = express.Router();


// CREATE A NEWS
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newNews = new News(req.body)

        try {
            const savedNews = await newNews.save();
            res.status(201).json(savedNews);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You're not allowed") // 403|forbidden
    }
})


// UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const updatedNews = await News.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedNews);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You're not allowed") // 403|forbidden
    }
})




module.exports = router;