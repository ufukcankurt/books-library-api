const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors")

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const bookRoute = require("./routes/books")
const postRoute = require("./routes/posts")
const noteRoute = require("./routes/notes")

dotenv.config();


mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology:true },
    () => {
        console.log("Connected to MONGODB");
    })

//middleware
app.use(express.json()); // body parser when you make  post request.. İt just gonna password it
app.use(helmet());
app.use(morgan("common")); // show on terminal| your date and request type and adress and status and duration of response
app.use(cors())

// address for rest API  || whenever go to this adress  it's gonna run this router.
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);
app.use("/api/posts", postRoute);
app.use("/api/notes", noteRoute);




app.listen(8000, () => console.log("Backend server is running!"))

