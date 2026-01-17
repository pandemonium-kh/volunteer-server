require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connect error:", err));

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/loginRoutes"));
app.use("/home", require("./routes/homeRoutes"));

app.get("/", (req, res) => {
    res.render("login");
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Server listening on ${PORT}`));