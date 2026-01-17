const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 20,
        match: /^[a-zA-Z0-9_]+$/, 
    },
    password: {
        type: String,
        required: true
    },
    realname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user" },
    phone: { 
        type: String,
        trim: true
    },
    major: {
        type: String,
        required: true
    },
    status: {     // 차단 or 탈퇴
        type: String,
        enum: ["active", "blocked"],
        default: "active" },
    },
    {timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);