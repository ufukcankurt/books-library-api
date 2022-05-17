const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")

router.get("/", (req, res) => {
    res.json("Hello to my app!")
})

// REGISTER
router.post("/register", async (req, res) => {
    console.log('aaa');
    console.log(req.body);

    const formData = req.body.formData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    const generatedUserId = uuidv4();
    const sanitizedEmail = formData.email.toLowerCase()

    try {

        const newUser = new User({
            userId: generatedUserId,
            fullname: formData.full_name,
            username: formData.username,
            email: sanitizedEmail,
            password: hashedPassword,
            dob_day: formData.dob_day,
            dob_month: formData.dob_month,
            dob_year: formData.dob_year,
            gender: formData.gender_identity
        })

        // const newUser = new User({
        //     userId:generatedUserId,
        //     fullname: req.body.fullname,
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password,
        //     dob_day: req.body.dob_day,
        //     dob_month: req.body.dob_month,
        //     dob_year: req.body.dob_year,
        //     gender: req.body.gender
        // })

        // mongoose automatically will save your user to DB
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Yanlış kullanıcı adı yada şifre")

        // compare passwords
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password"); // 400 - wrong password

        // _doc == all the information we receive
        const { password, ...info } = user._doc;

        // CREATE JWT
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "5d" })

        res.status(200).json({...info, accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;