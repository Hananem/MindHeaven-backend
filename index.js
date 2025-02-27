const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors");
const app = express()
app.use(express.json())
// Cors Policy
app.use(cors({
  origin: "http://localhost:3000"
}));


// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/password",require("./routes/passwordRoute"));

const MONGODB_URI = process.env.MONGODB_URI 
const PORT = process.env.PORT || 9000

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
