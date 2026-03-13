const express = require('express')
const musicControllers = require('../controllers/musicArtist.controller');
const multer = require('multer');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload', upload.single('music'), musicControllers.createMusicArtist)



module.exports = router;
