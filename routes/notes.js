const { verify } = require("jsonwebtoken");
const Note = require("../models/Note");
const User = require("../models/User")

const router = require("express").Router();

// CREATE A NOTE
router.post("/", verify, async (req, res) => {
    const newNote = new Note(req.body);

    try {
        const savedNote = await newNote.save();
        res.status(200).json(savedNote);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})



module.exports = router;