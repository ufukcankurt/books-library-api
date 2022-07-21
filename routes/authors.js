const express = require("express")
const verify = require("../verifyToken")
const Author = require("../models/Author");
const router = express.Router();


// GET A AUTHOR
router.get("/:id", verify, async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.status(200).json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

})


// CREATE A AUTHOR
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newAuthor = new Author(req.body)

        try {
            const savedAuthor = await newAuthor.save();
            res.status(201).json(savedAuthor);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You're not allowed") // 403|forbidden
    }
})


// UPDATE A AUTHOR
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedAuthor);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You're not allowed") // 403|forbidden
    }
})



module.exports = router;