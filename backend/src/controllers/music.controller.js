const musicModel = require('../models/music.model');
const { uploadFile } = require('../services/storage.service');
const albumModel = require('../models/album.model');
const jwt = require('jsonwebtoken');


async function createMusic(req, res) {
    const token = req.cookies.token;

    const { title } = req.body;
    const file = req.file;
    const result = await uploadFile(file.buffer.toString('base64'));
    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })
    res.status(201).json({
        message: "Music uploaded successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })
}

async function createAlbum(req, res) {
    const { title, musicIds } = req.body;
    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musicIds
    })
    res.status(201).json({
        message: "Album created successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics
        }
    })
}

async function getAllMusics(req, res) {
    const musics = await musicModel.find().limit(1).populate('artist', 'username email');
    res.status(200).json({
        message: "Musics retrieved successfully",
        musics: musics
    })
}


async function getAllAlbums(req, res) {
    const albums = await albumModel.find().select("title artist").populate('artist', 'username email')
    res.status(200).json({
        message: "Albums retrieved successfully",
        albums: albums
    })
}

async function getAlbumById(req, res) {
    const { albumId } = req.params;
    const album = await albumModel.findById(albumId).populate('artist', 'username email').populate('musics', 'title uri')
    if (!album) {
        return res.status(404).json({ message: "Album not found" })
    }
    res.status(200).json({
        message: "Album retrieved successfully",
        album: album
    })
}


module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById }