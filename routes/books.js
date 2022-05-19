const express = require("express")
const verify = require("../verifyToken")
const Book = require("../models/Book");
const router = express.Router();


// CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newBook = new Book(req.body)

        try {
            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
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
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedBook);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You're not allowed") // 403|forbidden
    }
})



module.exports = router;