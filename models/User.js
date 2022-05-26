const mongoose = require("mongoose")

const shelfSchema = new mongoose.Schema({
    bookId: {
        type: String,
        default: "",
    },
    bookStatus: {
        type: String,
        default: ""
    },
    bookHasShelf: {
        type: Array,
        default: []
    },
    bookStart: {
        type: String,
        default: ""
    },
   
    bookEnd: {
        type: String,
        default: ""
    },
    bookName:{
        type: String,
        default: ""
    },
    bookPage:{
        type: Number,
        default: ""
    },
    bookImg:{
        type: String,
        default: ""
    },
    bookAuthor:{
        type: String,
        default: ""
    }
})

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    dob_day: {
        type: String,
        max: 2,
        min: 2
    },
    dob_month: {
        type: String,
        max: 2,
        min: 2
    },
    dob_year: {
        type: String,
        max: 4,
        min:4
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 150,
        default: ""
    },
    city: {
        type: String,
        max: 50,
        default: ""
    },
    job: {
        type: String,
        max: 50,
        default: ""
    },
    education: {
        type: String,
        max: 50,
        default: ""
    },
    website: {
        type: String,
        max: 50,
        default: ""
    },
    gender: {
        type: String,
        required: true,
    },
    readingTarget: {
        type: String,
        max: 50,
        default: ""
    },
    didRead: {
        type: String,
        max: 50,
        default: ""
    },
    allShelfs: {
        type: Array,
        default: ["Okuduklarım","Okuyacaklarım","Yarım Bıraktıklarım"]
    },
    bookShelf: [shelfSchema]
},
    { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);