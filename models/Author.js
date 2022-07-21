const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true
    },
    authorTitle: {
        type: String,
    },
    authorBirth: {
        type: String,
        required: true
    },
    authorDeath: {
        type: String,
        required: true
    },
    authorDesc: {
        type: String,
        required: true
    },
    authorImg: {
        type: String,
        required: true
    },
    authorBooks: {
        type: Array,
        default: []
    },

},
    { timestamps: true }
)

module.exports = mongoose.model("Author", AuthorSchema);