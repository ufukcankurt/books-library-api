const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => {
        console.log("Connected to MONGODB");
    }
)

//middleware
app.use(express.json()); // body parser when you make  post request.. İt just gonna password it
app.use(helmet());
app.use(morgan("common")); // show on terminal| your date and request type and adress and status and duration of response






app.listen(8000, () => console.log("Backend server is running!"))

