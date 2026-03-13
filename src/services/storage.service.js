const {ImageKit} = require("@imagekit/nodejs");
require('dotenv').config();
const imageKit = new ImageKit({
    
    privateKey: process.env.IMAGEKIT_PUBLIC_KEY,
   
});

async function uploadFile(file) {

    const result = await imageKit.files.upload({
        file,
        fileName: "file.jpg",
        folder:"artist/muscicArtist"
    });
    return result
    console.log(result);
}

module.exports = { uploadFile }