require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const projectsRoutes = require("./routes/projects");
const userRoutes = require("./routes/user");

// express app
const app = express();
// port
const port = process.env.PORT || 5000;
// uri
const uri = process.env.MONGODB_URI;
// middlewares
app.use(express.json());
app.use(cors({ credentials: true }));
app.use("/", (req, res, next) => {
  console.log(req.method, req.path);
  next();
});
// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "hello express js" });
});
app.use("/api/projects", projectsRoutes);
app.use("/api/user", userRoutes);
// connect mongoose
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`app listing and connected mongoDB on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
