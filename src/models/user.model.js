const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   
        username: String, 
        password : String,
        email: {
            type :String,
            unique: true
        }
        
});
const Note = mongoose.model('Credential_Data', schema);

console.log(Note);

module.exports = Note;