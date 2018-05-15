const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000

// Init App
const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB (using mLab)
mongoose.connect(db)
  .then((() => console.log('MongoDB connected...')))
  .catch(err => console.log(err));

// Test Route
app.get('/', (req, res) => res.send('Hello World...'));

// Start Server
app.listen(port, () => console.log(`Servers running on port ${port}`));
