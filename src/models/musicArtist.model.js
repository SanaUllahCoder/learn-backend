const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema( {
    
    uri:{
        type: String,   
        required: true,
    },

    title: {    
        type: String,
        required: true,
    },
    artist: {    
        type: mongoose.schema.Types.ObjectId,
        required: true,
    }

})

const music = mongoose.model('music', musicSchema);
module.exports = music;