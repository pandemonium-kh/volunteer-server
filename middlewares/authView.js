const jwt = require("jsonwebtoken");

module.exports = function authView(req, res, next) {
    const token = req.cookies?.token;

    res.locals.isLoggedIn = false;
    res.locals.userId = null;

    if(!token) return next();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.isLoggedIn = true;
        res.locals.userId = decoded.id;
    } catch (e) {
        res.locals.isLoggedIn = false;
    }
    next();
};