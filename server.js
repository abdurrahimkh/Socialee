// Global Imports
const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');

// Project Import
const database = require('./config/database');
const viewsRouter = require('./routes/Views');
const postsRouter = require('./routes/Post');
const usersRouter = require('./routes/User');
const tagsRouter = require('./routes/Tags');
const { urlencoded } = require('express');

// Database connection
database.connect();

// Fire up server
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

//Static File Config
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', viewsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/tags', tagsRouter);

// Listen to Server
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
