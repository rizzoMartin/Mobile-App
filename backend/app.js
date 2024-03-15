const express = require('express');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const languageRoutes = require('./routes/languageRoutes');
const levelRoutes = require('./routes/levelRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/user', userRoutes);
app.use('/language', languageRoutes);
app.use('/level', levelRoutes)

module.exports = app;