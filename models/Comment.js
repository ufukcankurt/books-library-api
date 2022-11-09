const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    postId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },

},
    { timestamps: true }
)

module.exports = mongoose.model("Comment", CommentSchema);