const imageKit = require('@imagekit/nodejs');

const storage = new imageKit({
    privateKey: "private_XNGGhIfZtPrEWXpf7V/EMjeaemQ=",
});

async function uploadImage(buffer) {
    const response = await storage.file.upload({
        file: buffer.toString('base64'),
        fileName: "image.jpg",
    });
    return response;
}

    

module.exports = uploadImage;
