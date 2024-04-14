const express = require('express');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const languageRoutes = require('./routes/languageRoutes');
const levelRoutes = require('./routes/levelRoutes');
const topicRoutes = require('./routes/topicRoutes');
const translationRoutes = require('./routes/translationRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/user', userRoutes);
app.use('/language', languageRoutes);
app.use('/level', levelRoutes);
app.use('/topic', topicRoutes);
app.use('/translation', translationRoutes);

module.exports = app;