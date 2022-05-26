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

// GET A NOTE
router.get("/:id", verify,  async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)

        res.status(200).json(note)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

//GET USER'S ALL PROFİLE NOTES
router.get("/profile/:username",verify , async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const notes = await Note.find({ userId: user._id });
        res.status(200).json(notes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});





module.exports = router;