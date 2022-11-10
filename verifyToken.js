const jwt = require("jsonwebtoken")

function verify(req, res, next) {
    const authHeader = req.headers.token;

    if (authHeader) {
        // get token from header
        const token = authHeader.split(" ")[1]

        // verify this token --> return to us error or user
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) res.status(403).json("Token is not valid")
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You're not authenticated!")
    }
}

module.exports = verify