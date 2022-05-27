const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    shareDate: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("News", NewsSchema);