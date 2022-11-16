// Global Imports
const express = require("express");

// Project Import
const database = require("./config/database");
const viewsRouter = require("./routes/Views");

// Database connection
database.connect();

// Fire up server
const app = express();

// Routes
app.use("/", viewsRouter);

// Listen to Server
app.listen(5000, () => {
  console.log(`Server running at PORT: 5000`);
});
