const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
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
        required: true,
        max: 2
    },
    dob_month: {
        type: String,
        required: true,
        max: 2
    },
    dob_year: {
        type: String,
        required: true,
        max: 4
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
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    education: {
        type: String,
        max: 50
    },
    gender:{
        type: String,
        required:true
    },
    readingTarget: {
        type: String,
        max: 50
    },
    didRead: {
        type: String,
        max: 50
    },
    willRead: {
        type: String,
        max: 50
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);