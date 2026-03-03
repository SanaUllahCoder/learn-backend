const express = require('express');
const multer = require('multer');
const connectDB = require('./db/db');
const result = require('./service/storage.service');


connectDB();

const app = express();
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() })

app.post('/posts', upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const response = await result(req.file.buffer);
    console.log(response);
});
module.exports = app;
