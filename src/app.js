const express = require('express');
const authRouters = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const postRouters = require("./routes/post.route");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/post", postRouters);  
app.use("/api/auth", authRouters);


module.exports = app;