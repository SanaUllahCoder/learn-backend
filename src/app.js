const express = require('express')

const app = express();

const notes = [];

app.use(express.json())

// Create api 
// method post  and in the method data send
app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        msg: "successfully created"
    })
});

app.get('/notes', (req, res) => {
    
    res.status(201).json({
        msg: "successfully created",
        notes : notes
    })
})

module.exports = app;