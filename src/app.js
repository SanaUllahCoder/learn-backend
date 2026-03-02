const express = require("express");
const model = require("./model/note.model");
const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {

    const data = req.body;
    await model.create({
        name: data.name,
        email: data.email,
    })
    res.status(201).json({ message: "Note created successfully" });
});

app.get("/notes", async (req, res) => {
    
    const notes = await model.find();
    res.status(201).json({
        msg: "Notes fetched Successfully",
        notes : notes
    })
});

app.delete('/notes/:id', async (req, res) =>{
    const id =  req.params.id;
    await model.findByIdAndDelete({
        _id : id
    })
    res.status(200).json({
        msg : "notes deleted Successfully"
    })
})

app.patch('/notes/:id', async (req, res) =>{
    const id =  req.params.id;
    const email = req.body.email;
    await model.findByIdAndUpdate({ _id : id }, {email : email})
    res.status(200).json({
        msg : "notes updated Successfully"
    })
})

module.exports = app;
