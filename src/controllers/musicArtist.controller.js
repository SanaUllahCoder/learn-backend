const musicArtistModel = require('../models/musicArtist.model');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service');

async function createMusicArtist(req, res) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { title } = req.body;
        const file = req.file;
        const result = await uploadFile(file.buffer.toString('base64'));
        const musicArtist = await musicArtistModel.create({
            uri: result.url,
            title,
            image: decoded.id
        });

        res.status(201).json({
            message: 'Music Artist created successfully',
            music: {
                id: musicArtist._id,
                title: musicArtist.title,
                uri: musicArtist.uri,
                artist: musicArtist.artist
            }
        });

        if (decoded.role !== 'artist') {
            return res.status(403).json({ message: 'You dont have access to the Artist' });
        }
    } catch (error) {
        console.error('Error creating music artist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }


}

module.exports = { createMusicArtist }