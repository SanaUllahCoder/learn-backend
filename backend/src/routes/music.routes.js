const fs = require('fs');
const path = require('path');
const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const uploadDir = path.join(__dirname, '../../tmp/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });

const router = express.Router();

router.post('/upload', authMiddleware.authArtist, upload.single('music'), musicController.createMusic);

router.post('/album', authMiddleware.authArtist, musicController.createAlbum);
router.get('/', authMiddleware.authUser, musicController.getAllMusics);
router.get('/album', authMiddleware.authUser, musicController.getAllAlbums);
router.get('/album/:albumId', authMiddleware.authUser, musicController.getAlbumById);
router.get('/logout', authMiddleware.logoutUser);
module.exports = router;