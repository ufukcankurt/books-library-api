const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
    },
    type: {
        type: String,
        required: true 
    },
    desc: {
        type: String,
    },
    bookStatus: {
        type: String,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema);