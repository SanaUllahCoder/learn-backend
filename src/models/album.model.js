const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    musics: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'music',

    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spotify',
        required: true
    }
});


const albumModel = mongoose.model("album", musicSchema);

module.exports = albumModel;