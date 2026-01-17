const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// 회원가입 화면 열기
// @route GET /register
const getRegister = (req, res) => {
    res.render("register");
};

// 회원가입하기
// @route POST /register
const registerUser = asyncHandler(async (req, res) => {
    const { username, password, password2, name, phone, major } = req.body;
    if (password === password2) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, realname: name, phone, major });
        res.redirect("/login?success=1");
    }
})

// 로그인 화면 열기
// @route GET /login
const getLogin = (req, res) => {
      res.render("login", { success: req.query.success === "1" });
};

// User 로그인
// @route POST /login
const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {    // 아이디 없음
        return res.redirect("/login?error=user");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { // 비밀번호 틀림
        return res.redirect("/login?error=password");
    }
    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/home");
})

// 로그아웃
// @route GET /logout
const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
}

module.exports = { getRegister, registerUser, getLogin, loginUser, logout };