const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());

// ✅ CORS Policy
app.use(cors({
  origin: ["http://localhost:3000", "https://mindheaven-apd7.onrender.com"],
  credentials: true,
}));

// ✅ Serve static images or files
app.use("/images", express.static(path.join(__dirname, "public/images")));

// ✅ API Routes (ضعها قبل React frontend)
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

// ✅ Serve React frontend from build
app.use(express.static(path.join(__dirname, "MindHeaven-frontend", "build")));

// ✅ React catch-all route (بعد كل الراوتس)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "MindHeaven-frontend", "build", "index.html"));
});

// ✅ MongoDB and Server Start
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 9000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

