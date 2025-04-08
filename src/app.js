const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is trying its best to be healthy...')
})

// endpoints or routes
app.use('/api/auth/', authRoutes);

// mongodb connection

mongoose.connect(process.env.DB_URL)
.then(() => {
  console.log("Successfully connected to mongodb");
})
.catch((err) => {
  console.log("Error connecting to mongodb", err.message);
})

module.exports = app;