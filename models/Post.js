const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
    },
    postType: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    bookStatus: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema);