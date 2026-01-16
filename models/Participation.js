const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema({
    name: { type: String, required: true},
    date: { type: String, required: true},
    hours: { type: String, required: true},
    status: { type: String, default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Participation", participationSchema);