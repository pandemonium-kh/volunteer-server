require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connect error:", err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running!");
})

const Participation = require("./models/Participation");

// 기록 추가
app.post("/api/participations", async (req, res) => {
    try {
        const { name, date, hours } = req.body;
        const created = await Participation.create({ name, date, hours });
        res.status(201).json(created);
    } catch (error) {
        res.status(400).json({ message: e.message });
    }
});

// 전체 조회
app.get("/api/participations", async (req, res) => {
    const list = await Participation.find().sort({ createdAt: -1 });
    res.json(list);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));