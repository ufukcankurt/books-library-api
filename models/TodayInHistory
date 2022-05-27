const mongoose = require("mongoose");

const TodayInHistorySchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true
    },
    authorImg: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("TodayInHistory", TodayInHistorySchema);