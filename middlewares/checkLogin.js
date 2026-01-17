const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const checkLogin = async (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    const token = req.cookies.token;
    if(!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.username = decoded.username;
        return next();
    } catch(error) {
       return res.redirect("/login");
    }
};

module.exports = checkLogin;