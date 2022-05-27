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



module.exports = router;