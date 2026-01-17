const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const checkLogin = require("../middlewares/checkLogin");
/*
const {
    getHome
} = require("../controllers/homeControllers");
*/
router.use(cookieParser());

router
    .get("/", (req, res) => {
  res.render("home");
});


module.exports = router;