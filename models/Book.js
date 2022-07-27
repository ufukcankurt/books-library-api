const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    book_name: {
        type: String,
        required: true
    },
    book_img: {
        type: String,
        required: true
    },
    book_backDesc: {
        type: String,
        required: true
    },
    book_author: {
        type: String,
        required: true
    },
    book_authorId: {
        type: String,
        required: true
    },
    book_page: {
        type: Number,
        required: true
    },
    book_genre: {
        type: Array,
        required: true,
        default: []
    },
    book_published: {
        type: String,
        required: true
    },
    book_firstPublished: {
        type: String,
        default: ""
    },
    book_publishingHouse: {
        type: String,
        required:true,
        default: ""
    },
    book_isbn: {
        type: String,
        required:true,
        default: ""
    }
    
},
    { timestamps: true }
)

module.exports = mongoose.model("Book", BookSchema);