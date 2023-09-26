const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auths.js");
const commentRoutes = require("./routes/comments.js");
const likeRoutes = require("./routes/likes.js");
const postRoutes = require("./routes/posts.js");
const relationshipRoutes = require("./routes/relationships.js");
const searchRoutes = require("./routes/searches.js");
const suggestionRoutes = require("./routes/suggestions.js");
const activityRoutes = require("./routes/activities.js");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const app = express();

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cf) {
        cf(null, "../client/public/uploads");
    },
    filename: function (req, file, cf) {
        cf(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/api/uploads", upload.single("file"), (req,res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/auths", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/searches", searchRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/activities", activityRoutes);

app.listen("5000", () => {
    console.log("Listening to the port 5000!")
})