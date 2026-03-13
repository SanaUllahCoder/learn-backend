const express = require('express');
const cookie = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/musicArtist.routes');


const app = express();

app.use(express.json());
app.use(cookie());
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes)


module.exports = app;