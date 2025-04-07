const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is trying its best to be healthy...')
})

module.exports = app;