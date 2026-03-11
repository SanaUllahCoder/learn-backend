const express = require('express');
const authRouters = require('./routers/auth.route');
const cookieParser = require('cookie-parser');
const postRouter = require("./routers/post.route")
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/post", postRouter);  
app.use("/api/auth", authRouters);


module.exports = app;