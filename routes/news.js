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


// DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {

        try {
            await News.findByIdAndDelete(req.params.id)
            res.status(200).json("The news has been deleted");
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You're not allowed") // 403|forbidden
    }
})


// GET
router.get("/:id", verify, async (req, res) => {
    // even if we're not an admin we can read book we can see any information about books. 
    // So there is no need to be admin
    try {
        const news = await News.findById(req.params.id)
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

})

//GET ALL NEWS
router.get("/all/news", async (req, res) => {
    try {
        const news = await News.find().sort({ _id: -1 });
        res.status(200).json(news);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;