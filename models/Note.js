const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    bookId: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
    },
    character: {
        type: String,
        default: ""
    },
    summary: {
        type: String,
        default: ""
    },
    quote: {
        type: String,
        default: ""
    },
    private: {
        type: String,
        default: ""
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Note", NoteSchema);
