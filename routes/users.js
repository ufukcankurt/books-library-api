const express = require("express");
const User = require("../models/User");
const router = express.Router();


router.get("/", async (req, res) => {
    res.send("Hoşgeldiniz.")
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;