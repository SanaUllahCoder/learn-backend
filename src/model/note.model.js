const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
        name: String,
        email: String 
});

const note = mongoose.model("Note", noteSchema);
module.exports = note;
