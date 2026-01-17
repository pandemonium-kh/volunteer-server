require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authView = require("./middlewares/authView");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connect error:", err));

const app = express();

app.use(cookieParser());
app.use(authView);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/loginRoutes"));
app.use("/home", require("./routes/homeRoutes"));

app.get("/", (req, res) => {
    res.redirect("/home");
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Server listening on ${PORT}`));