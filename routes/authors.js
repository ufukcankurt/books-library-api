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


module.exports = router;