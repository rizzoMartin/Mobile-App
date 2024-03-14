const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const languageRoutes = require('./routes/languageRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/language', languageRoutes);

module.exports = app;