const express = require('express')

const app = express();

const notes = [];

app.use(express.json())

// Create api 
// method post  and in the method data send
app.post('/notes', (req, res) => {
    notes.push(req.body);
    // console.log(req.body);
    res.status(201).json({
        msg: "Notes fetched successfully"
    })
});

// GET METHOD  
app.get('/notes', (req, res) => {
    res.status(200).json({
        msg: "Notes fetched successfully",
        notes: notes
    });
});

// DELETE METHOD 
// app.delete('/notes/:index', (req, res) => {
//     const index = req.params.index;
//     delete notes[ index ];
//     res.status(200).json({
//         msg: "Notes deleted successfully"
//     })

// });

// PATH METHOD 
app.patch('/notes/:index', (req, res) => {

    const index = req.params.index;
    const names = req.body.name;
    notes[ index ].name = names;

    res.status(200).json({
        msg: "Notes updated successfully"
    })

})

module.exports = app;