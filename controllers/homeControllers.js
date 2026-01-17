const asyncHandler = require("express-async-handler");
const Home = require();

// 홈
// @route GET /home
const getHome = asyncHandler (async (req, res) => {
    res.render("home");
})

module.exports = {
    getHome
};