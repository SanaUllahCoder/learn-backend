const jwt = require('jsonwebtoken');

async function authArtist(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })

    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
            if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You dont have access to upload file" })
        }
        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" })
    }       
}

async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== "user"){   
            return res.status(403).json({ message: "You dont have access to this resource" })
        }
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" })
    }
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" })
}

module.exports = {authArtist, authUser, logoutUser};