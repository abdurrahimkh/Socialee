// Global Imports
const express = require("express");
const dotenv = require("dotenv").config();

// Project Import
const database = require("./config/database");
const viewsRouter = require("./routes/Views");
const postsRouter = require("./routes/Post");
const usersRouter = require("./routes/User");

// Database connection
database.connect();

// Fire up server
const app = express();
app.use(express.json());

// Routes
app.use("/", viewsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

// Listen to Server
app.listen(5000, () => {
  console.log(`Server running at PORT: 5000`);
});
