const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        fs.mkdirSync('./uploads', {recursive: true})
        return cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        return cb(null, Date.now() + "-" + file.originalname)
    },
})

const uploadStorage = multer({storage})

module.exports = { uploadStorage }