const express = require("express")
const verify = require("../verifyToken")
const TodayInHistory = require("../models/TodayInHistory");
const router = express.Router();


// CREATE A QUOTE OR EVENT
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newTodayInHistory = new TodayInHistory(req.body)
        try {
            const savedTodayInHistory = await newTodayInHistory.save();
            res.status(201).json(savedTodayInHistory);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You're not allowed") // 403|forbidden
    }
})

// UPDATE A QUOTE OR EVENT
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedTodayInHistory = await TodayInHistory.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedTodayInHistory);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You're not allowed") // 403|forbidden
    }
})


// DELETE A QUOTE OR EVENT
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await TodayInHistory.findByIdAndDelete(req.params.id)
            res.status(200).json("The Quote has been deleted");
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You're not allowed") // 403|forbidden
    }
})

//GET QUOTE BASED ON DATE
router.get("/all/today", async (req, res) => {
    try {
        const quotes = await TodayInHistory.find({ date: req.body.date });
        res.status(200).json(quotes);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;