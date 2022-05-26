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


// UPDATE A NOTE
router.put("/:id", verify, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note.userId = req.body.userId) {
            await note.updateOne({ $set: req.body });
            res.status(200).json("The note has been updated")
        } else {
            res.status(403).json("You can update only your note")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})




module.exports = router;